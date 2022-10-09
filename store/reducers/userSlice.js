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
export const checkSession = () => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    dispatch(login(session.user));
  }
};

export const logoutUser = (router) => (dispatch) => {
  supabase.auth.signOut();
  router.push('/');
  dispatch(logout());
};
export const createUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.post('/api/users', {
        ...userDetails,
      });
      if (user) {
        attemptPsswordLogin({
          username: userDetails.username,
          password: userDetails.password,
        })(dispatch);
      }
    } catch (error) {
      throw error;
    }
  };
};
export const updateUser = (userDetails, userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data: user } = await axios.put(
      `/api/users/${userId}`,
      userDetails,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(update(user));
  } catch (error) {
    throw error;
  }
};
