import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeMessage,
  sendMessage,
  sub,
  unsub,
} from '../store/reducers/messengerSlice';

export default function Chatroom() {
  const dispatch = useDispatch();
  const { messageUserId, currentMessage, messages } = useSelector(
    (state) => state.messenger
  );

  useEffect(() => {
    const messageSub = sub();
    return () => {
      unsub(messageSub);
    };
  }, [messageUserId]);

  function handleSend() {
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
    <div className="chatroom">
      <div className="chats">
        {messages
          .filter((message) => {
            return (
              message.to === messageUserId || message.from === messageUserId
            );
          })
          .map((message) => (
            <p
              key={message.id}
              className={message.from === messageUserId ? 'reciever' : 'sender'}
            >
              {message.message}
            </p>
          ))}
      </div>
      <div>
        <input
          className="chat-input"
          type="text"
          placeholder="Say something nice!"
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={currentMessage}
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
