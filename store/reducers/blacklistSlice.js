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
  return async (dispatch) => {
    const { data, error } = await supabase
      .from('blacklist')
      .insert({ id, blacklisted_id });
    dispatch(storeReportedUser(data));
  };
};
