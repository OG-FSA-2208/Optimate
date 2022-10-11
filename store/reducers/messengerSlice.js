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
    addMessage: (state, action) => {
      //TODO: add message to UI
    },
    changeMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
  },
});

//export stuff here
export const { setMessageUser, addMessage, changeMessage, fetchMessages } =
  messengerSlice.actions;
export default messengerSlice.reducer;

//THUNKS
export const getMessages = () => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .select()
      .or(`from.eq.${session.user.id},to.eq.${session.user.id}`);
    dispatch(fetchMessages(data));
  }
};

export const sendMessage = () => async (dispatch) => {
  //TODO: send message to db, add to UI when done sending
};

export const sub = () => async (dispatch) => {
  //TODO: subscribe to db, add message when one is recieved
};

export const unsub = () => async (dispatch) => {
  //TODO: unsubscribe to db
};
