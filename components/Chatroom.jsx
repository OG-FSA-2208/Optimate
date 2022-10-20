import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInput,
  sendMessage,
  changeMessage,
  deleteMessage,
} from '../store/reducers/messengerSlice';
import { Edit, Delete } from '@mui/icons-material';

export default function Chatroom() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { messageUserId, currentMessage, messages } = useSelector(
    (state) => state.messenger
  );

  useEffect(() => {
    if (router.query.id === messageUserId) {
      const lastMessage = document.querySelector('.last');
      lastMessage?.scrollIntoView(false);
    }
  }, [messages]);

  function handleSend() {
    if (!currentMessage) {
      //TODO: set error for chatbox?
      return;
    }
    dispatch(sendMessage(currentMessage, messageUserId));
    dispatch(changeInput(''));
  }

  function handleEnter(e) {
    if (e.key === 'Enter') handleSend();
  }
  function handleChange(e) {
    e.preventDefault();
    dispatch(changeInput(e.target.value));
  }

  function handleEdit() {
    //TODO: implement - either change the single message to an input box or use an edit = true state and put the message in the chatbox
  }
  function handleDelete(id) {
    dispatch(deleteMessage(id));
  }

  return (
    <>
      <div className="chatroom">
        <div className="chats">
          {messages
            .filter((message) => {
              return (
                message.to === messageUserId || message.from === messageUserId
              );
            })
            .map((message, idx, filteredArr) => (
              <div
                key={message.id}
                className={idx === filteredArr.length - 1 ? 'last' : ''}
              >
                {message.from === messageUserId ? (
                  <div className="single-message">
                    <img
                      src={message.from_pic?.avatar_url}
                      alt="user profile pic"
                    />
                    <p className={'chat-match'}>{message.message}</p>
                  </div>
                ) : (
                  <div key={message.id} className="single-message right-user">
                    <Delete
                      sx={{ '&:hover': { color: 'red' } }}
                      onClick={() => handleDelete(message.id)}
                    />
                    <Edit
                      sx={{ '&:hover': { color: 'gray' } }}
                      onClick={handleEdit}
                    />
                    <p className={'user'}>{message.message}</p>
                    <img
                      src={message.from_pic?.avatar_url}
                      alt="user profile pic"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="input-box">
        <input
          className="chat-input"
          type="text"
          placeholder="Shoot your shot!"
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={currentMessage}
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </>
  );
}
