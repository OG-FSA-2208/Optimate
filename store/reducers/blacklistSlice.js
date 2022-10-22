import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const blacklistSlice = createSlice({
  name: 'blacklist',
  initialState: {},
  reducers: {
    storeReportedUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default blacklistSlice.reducer;
export const { storeReportedUser } = blacklistSlice.actions;

export const blacklistUser = (id, blacklisted_id) => {
  console.log('jsfkldlfjskd', blacklistSlice);
  return async (dispatch) => {
    const { data, error } = await supabase
      .from('blacklist')
      .insert({ id, blacklisted_id });
    // .select();
    console.log(data, error);
    dispatch(storeReportedUser(data));
  };
};

// from blacklist table
// check first name last name who the user is
// grab user ID and store that to blacklist table

// user id and blacklist user id
