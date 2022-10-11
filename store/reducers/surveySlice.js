import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const surveySlice = createSlice({
  name: 'userProfileEdit',
  initialState: [],
  reducers: {
    getInterests: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default surveySlice.reducer;
export const { getInterests } = surveySlice.actions;
export const getInterestTypes = () => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('interests')
      .select('*');
    dispatch(getInterests(data));
  }
};
