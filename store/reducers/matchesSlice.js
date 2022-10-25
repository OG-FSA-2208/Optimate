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
    console.log('runq');
    // const { data: ma, error: er } = await supabase.rpc('get_all_matches');
    // console.log(ma, er);
    const { data, error } = await supabase.rpc('get_all_matches');
    if (data) {
      console.log('hi');
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
      dispatch(fetchMatches(matchedUser));
    }
  }
};
