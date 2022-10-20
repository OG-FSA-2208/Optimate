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
      //set chatroom ID
      state.messageUserId = action.payload.id;

      //read all messages from clicked user's chat
      state.messages = state.messages.map((message) =>
        action.payload.data?.some((mes) => mes.id === message.id)
          ? { ...message, read: true }
          : message
      );
    },
    fetchMessages: (state, action) => {
      //get all messages from db and put on store
      state.messages = [...action.payload];
    },
    addMessage: (state, action) => {
      //if in chat with user, mark message as read and update to db
      if (state.messageUserId === action.payload.from) {
        action.payload.read = true;
        supabase.from('messages').update({ read: true }).match({
          to: action.payload.to,
          from: action.payload.from,
          read: false,
        });
      }
      //add message to store
      state.messages.push(action.payload);
    },
    changeMessage: (state, action) => {
      //change input value for chatbox
      state.currentMessage = action.payload;
    },
  },
});

//export actions and reducer here
export const { readMessages, addMessage, changeMessage, fetchMessages } =
  messengerSlice.actions;
export default messengerSlice.reducer;

//THUNKS
//grab all yer messages, to and fro
export const getMessages = () => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, from_pic:from ( avatar_url )')
      .or(`from.eq.${session.user.id},to.eq.${session.user.id}`)
      .order('created_at');
    if (data) dispatch(fetchMessages(data));
    if (error) console.error(error);
  }
};

//thunk to send a message to a user
export const sendMessage = (message, to) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          from: session.user.id,
          to,
          message,
        },
      ])
      .select('*, from_pic:from ( avatar_url )');
    if (data) dispatch(addMessage(data[0]));
    if (error) console.error(error);
  }
};

//thunk to edit a message
export const editMessage = (messageId, editedMessage) => async (dispatch) => {
  const session = supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .update({ message: editedMessage })
      .match({ id: messageId });
    if (data) {
      //TODO: update store
    }
    if (error) console.error(error);
  }
};

//thunk to delete a message
export const deleteMessage = (messageId) => async (dispatch) => {
  const session = supabase.auth.session();
  if (session) {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .match({ id: messageId });
    if (data) {
      //TODO: update store
    }
    if (error) console.error(error);
  }
};

//thunk for clicking on a match on messages page
export const clickMessages = (id, messages) => async (dispatch) => {
  const session = await supabase.auth.session();
  if (session) {
    if (
      messages.some((message) => message.from === id && message.read === false)
    ) {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .match({ to: session.user.id, from: id, read: false })
        .select('*, from_pic:from ( avatar_url )');

      dispatch(readMessages({ id, data }));
      if (error) console.error(error);
    } else dispatch(readMessages({ id, data: null }));
  }
};

//helper functions for messaging
//check for logged in user, subscribe to messages sent to that user, add message when one comes in
export const sub = () => (dispatch) => {
  const session = supabase.auth.session();
  if (session) {
    //TODO: add update and delete to subscription, update store when something happens
    const messageListener = supabase
      .from(`messages:to=eq.${session.user.id}`)
      .on('INSERT', async (payload) => {
        //grab match profile pic
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', payload.new.from);
        //add new message to chat when one is sent to user
        if (data) dispatch(addMessage({ ...payload.new, from_pic: data[0] }));
        if (error) console.error(error);
      })
      .subscribe();

    return messageListener;
  }
};

//unsubscribe from messages with this
export const unsub = (channel) => {
  channel.unsubscribe();
};
