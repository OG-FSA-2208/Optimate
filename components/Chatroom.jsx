import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMessage, sendMessage } from '../store/reducers/messengerSlice';

export default function Chatroom() {
  const dispatch = useDispatch();
  const { messageUserId, currentMessage, messages } = useSelector(
    (state) => state.messenger
  );

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
    <div className="chatMessageBox">
      <div className="chatroom">
        <div className="chats">
          {messages
            .filter((message) => {
              return (
                message.to === messageUserId || message.from === messageUserId
              );
            })
            .map((message) => (
              <div
                key={message.id}
                className={
                  message.from === messageUserId ? 'chat-match' : 'user'
                }
              >
                <p>{message.message}</p>
              </div>
            ))}
        </div>
      </div>
      <div>
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
    </div>
  );
}
