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
    const { data, error } = await supabase.rpc('get_all_match_ids');
    if (data) {
      const matchedUser = await Promise.all(
        data.map((match) => {
          const findMatch = async () => {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', match)
              .single();
            return data;
          };
          return findMatch();
        })
      );
      dispatch(fetchMatches(matchedUser));
    }
  }
};
