import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const blacklistSlice = createSlice({
  name: 'blacklist',
  initialState: {},
  reducer: {
    storeReportedUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default blacklistSlice.reducer;
export const { storeReportedUser } = blacklistSlice.actions;

export const blacklistUser = (firstname, lastname) => {
  async (dispatch) => {
    const { data, error } = await supabase
      .from('blacklist')
      .insert({ firstname: data.firstname, lastname: data.lastname });
    dispatch(storeReportedUser(data));
  };
};
