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
    readMessages: (state, action) => {
      state.messageUserId = action.payload.id;
      state.messages = state.messages.map((message) =>
        action.payload.data.includes(message) ? (message.read = true) : message
      );
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
export const { readMessages, addMessage, changeMessage, fetchMessages } =
  messengerSlice.actions;
export default messengerSlice.reducer;

//THUNKS
//grab all yer messages, to and from
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

//thunk to send a message to a user
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

//thunk for clicking on a match in messages
export const clickMessages = (id) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .match({ to: session.user.id, from: id });
    if (data) dispatch(readMessages({ id, data })); //set items to read in messenger part of store
    if (error) console.error(error);
  }
};

//helper functions for messaging
//check for logged in user, subscribe to messages sent to that user, add message when one comes in
export const sub = () => (dispatch) => {
  const session = supabase.auth.session();
  if (session) {
    const messageListener = supabase
      .from(`messages:to=eq.${session.user.id}`)
      .on('INSERT', (payload) => {
        dispatch(addMessage(payload.new));
      })
      .subscribe();
    return messageListener;
  }
};

//unsubscribe from messages wiht this
export const unsub = (channel) => {
  channel.unsubscribe();
};
