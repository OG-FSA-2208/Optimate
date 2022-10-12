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

//helper functions for messenging
//check for logged in user, subscribe to messages sent to that user, add message when one comes in
//.from(`messages:to=${session.user.id}`) change from to this and it should only get recieved messages. doesnt work tho
export const sub = (session) => async (dispatch) => {
  const messageListener = await supabase
    .from(`messages:to=eq.${session.user.id}`)
    .on('INSERT', (payload) => {
      console.log(`payload:to=eq.${session.user.id}`, payload.new);
      dispatch(addMessage(payload.new));
    })
    .subscribe();
  return messageListener;
};

//unsubscribe from messages wiht this
export const unsub = (channel) => {
  channel.unsubscribe();
};
