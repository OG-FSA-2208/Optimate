import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const surveySlice = createSlice({
  name: 'userProfileEdit',
  initialState: {},
  reducers: {
    getInterests: (state, action) => {
      state = {...state, tags: action.payload};
      return state;
    },
    setAvatarURL: (state, action) => {
      state = {...state, avatar_url: action.payload};
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
export const { setAvatarURL } = surveySlice.actions;
export const uploadAvatar = (avatarFile, userData) => async (dispatch) => {
  // caching issue happens here!!!
  // await supabase.storage.from('avatars').remove([`${userData?.firstname}_avatar`]);
  // const {data} = await supabase.storage.from('avatars')
  //   .upload(`${userData?.firstname}_avatar`, avatarFile, {upsert: true})
  // const { publicURL, imgError } = await supabase
  //   .storage
  //   .from('avatars')
  //   .getPublicUrl(`${userData?.firstname}_avatar`);

  // backup plan...
  const {data} = await supabase.storage.from('avatars')
      .upload(`${userData?.id}_${avatarFile.name}`, avatarFile, {upsert: true});
  const { publicURL, imgError } = await supabase
    .storage
    .from('avatars')
    .getPublicUrl(`${userData?.id}_${avatarFile.name}`);

  dispatch(setAvatarURL(publicURL));
}
