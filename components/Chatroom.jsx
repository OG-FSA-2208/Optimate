import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { changeMessage, sendMessage } from '../store/reducers/messengerSlice';

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
      //TODO: set error for chatbox
      return;
    }
    dispatch(sendMessage(currentMessage, messageUserId));
    dispatch(changeMessage(''));
  }

  function handleEnter(e) {
    if (e.key === 'Enter') handleSend();
  }
  function handleChange(e) {
    e.preventDefault();
    dispatch(changeMessage(e.target.value));
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
                    {/* TODO: fix message from_pic being null on add message thunk */}
                    <img
                      src={message.from_pic?.avatar_url}
                      alt="user profile pic"
                    />
                    <p className={'chat-match'}>{message.message}</p>
                  </div>
                ) : (
                  <div key={message.id} className="single-message right-user">
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
