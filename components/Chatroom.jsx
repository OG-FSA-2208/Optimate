import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, changeMessage } from '../store/reducers/messengerSlice';

export default function Chatroom() {
  const dispatch = useDispatch();
  const {
    messageUser: messageUserId,
    currentMessage,
    messages,
  } = useSelector((state) => state.messenger);

  useEffect(() => {
    if (messageUserId) dispatch(getMessages(messageUserId));
  }, [messageUserId]);

  function handleSend() {
    //TODO: handle clicking send
  }

  function handleEnter(e) {
    //TODO: handle cliking enter, send message to database
  }
  function handleChange(e) {
    e.preventDefault();
    dispatch(changeMessage(e.target.value));
  }

  return (
    <div className="chatroom">
      <div className="chats">
        {/* use a ternary to add a className to each p with either sender or reciever */}
        {messages.map((message) => (
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
