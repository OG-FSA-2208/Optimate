import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';
const matchesSlice = createSlice({
  name: 'matches',
  initialState: [],
  reducers: {
    fetchMatches: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export default matchesSlice.reducer;
export const { fetchMatches, update } = matchesSlice.actions;

export const getAllUserMatches = (router) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase.rpc('get_all_matches');
    if (data) {
      const matchedUser = await Promise.all(
        data.map((match) => {
          const findMatch = async () => {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', match.match)
              .single();
            return { ...data, match };
          };
          return findMatch();
        })
      );
      matchedUser.sort(
        (a, b) =>
          b.match.pinned +
          b.match.pin1 +
          b.match.pin2 +
          (b.id === b.match.id && b.match.pin1 === true) +
          (b.id === b.match.id2 && b.match.pin2 === true) -
          (a.match.pinned +
            a.match.pin1 +
            a.match.pin2 +
            (a.id === a.match.id && a.match.pin1 === true) +
            (a.id === a.match.id2 && a.match.pin2 === true))
      );
      dispatch(fetchMatches(matchedUser));
    }
  }
};
