import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const profileSlice = createSlice({
  name: 'userProfile',
  initialState: {},
  reducers: {
    getUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default profileSlice.reducer;
export const { getUser } = profileSlice.actions;
export const getLoggedInUser = (router) => async (dispatch) => {
  const session = await supabase.auth.session();
  //   const profile = await supabase.from('profiles');
  if (session) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    dispatch(getUser(data));
  }
};
