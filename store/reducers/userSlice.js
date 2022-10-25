import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';
import axios from 'axios';
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
  // console.log('is there a session', session);
  if (session) {
    // console.log('hi', session);
    dispatch(login(session.user));
  } else {
    if (router) {
      router.push('/');
    }
  }
};
export const providerOAuth = (provider) => async (dispatch) => {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: provider,
    },
    { redirectTo: `${process.env.URL}` || 'http://localhost:3000' }
  );
  if (user) {
    dispatch(login(user));
  }
  if (error) {
    console.error(error);
  }
};

export const logoutUser = (router) => (dispatch) => {
  supabase.auth.signOut();
  dispatch(logout());
  router.push('/');
};
export const deleteUser = (router) => async (dispatch) => {
  const { data } = await axios.post(`/api/deleteUser`, {
    session: supabase.auth.session(),
  });
  console.log(data);
  // supabase.auth.signOut();
  // dispatch(logout());
  // router.push('/');

  // does this not need to also logout the user so the state logs them out?
  // -Eve
};
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
