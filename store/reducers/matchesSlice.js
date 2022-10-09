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
    // update: (state, action) => {
    //   state = action.payload;
    //   return state;
    // },
  },
});
export default matchesSlice.reducer;
export const { fetchMatches, update } = matchesSlice.actions;
export const getAllUserMatches = (router) => async (dispatch) => {
  const session = await supabase.auth.session();
  console.log('print session', session.user.id);
  if (session) {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', session.user.id)
      .single();
    console.log('print data', data);
    console.log('print error', error);
    dispatch(fetchMatches(data.matches_id));
  }
};

//
