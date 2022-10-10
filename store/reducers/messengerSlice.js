import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    messageUser: null,
    messages: [],
    currentMessage: '',
  },
  reducers: {
    setMessageUser: (state, action) => {
      state.messageUser = action.payload;
    },
    fetchMessages: (state, action) => {
      state.messages = [...action.payload];
    },
    sendMessage: (state, action) => {
      //TODO: send message
    },
    changeMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
  },
});

//export stuff here
export const { setMessageUser, sendMessage, changeMessage, fetchMessages } =
  messengerSlice.actions;
export default messengerSlice.reducer;

//THUNKS
export const getMessages = (userId) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .select()
      .or(
        `and(from.eq.${session.user.id},to.eq.${userId}),and(from.eq.${userId},to.eq.${session.user.id})`
      );
    dispatch(fetchMessages(data));
  }
};
