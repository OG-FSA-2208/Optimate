import { createSlice } from '@reduxjs/toolkit';
import supabase from '../../config/supabaseClient';

const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    messageUserId: null,
    messages: [],
    currentMessage: '',
  },
  reducers: {
    setMessageUser: (state, action) => {
      state.messageUserId = action.payload;
    },
    fetchMessages: (state, action) => {
      state.messages = [...action.payload];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
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
    if (data) dispatch(fetchMessages(data));
    if (error) console.error(error);
  }
};

export const sendMessage = (message, to) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase.from('messages').insert([
      {
        from: session.user.id,
        to,
        message,
      },
    ]);
    if (data) dispatch(addMessage(data[0]));
    if (error) console.error(error);
  }
};

export const sub = () => async (dispatch) => {
  //TODO: subscribe to db, add message when one is recieved
};

export const unsub = () => async (dispatch) => {
  //TODO: unsubscribe to db
};
