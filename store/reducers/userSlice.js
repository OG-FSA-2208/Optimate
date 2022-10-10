import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
    console.log(session);
    return true;
    console.log('print out session.user', session.user);
  } else {
    if (router) {
      router.push('/');
    }
  }
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
      console.log(error);
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
};
