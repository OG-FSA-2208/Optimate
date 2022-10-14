import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';
const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      state = {};
      return state;
    },
    update: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export default userSlice.reducer;
export const { login, logout, update } = userSlice.actions;
export const checkSession = (router) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    dispatch(login(session.user));
  } else {
    if (router) {
      router.push('/');
    }
  }
};
export const providerOAuth = (provider) => async (dispatch) => {
  console.log(provider);
  const { user, session, error } = await supabase.auth.signIn({
    provider: provider,
    redirectTo: `${process.env.URL}` || 'http://localhost:3000',
  });
  if (error) {
    console.error(error);
  }
  // if (user) {
  //   console.log(user);
  // }
  // if (session) {
  //   console.log(session);
  // } needed?
};

export const logoutUser = (router) => (dispatch) => {
  supabase.auth.signOut();
  dispatch(logout());
  router.push('/');
};

export const createUser = (userDetails) => {};
export const updateUser = (userDetails, userId) => async (dispatch) => {
  try {
    let { error } = await supabase
      .from('profiles')
      .update(userDetails)
      .eq('id', userId);
    if (error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
};
