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

  function setTime(date) {
    /*TODO:  grab old hours
    subtract local timezones (now date) first two numbers
    if negative add a 'yesterday at (time+24)' to the string, more than 24hr add 'date at time'
    so if my old time is 2000 then MY time should be 1600.....0000 -> yesterday at 8:00 PM...........1536 2 days ago -> sent: 10/19/2022 at 11:36 AM */
    const now = new Date();
    //get local sent time
    let tzCorrectedHour = date.slice(11, 13) - now.getTimezoneOffset() / 60;
    if (tzCorrectedHour < 0) tzCorrectedHour += 24;
    const timeOfDay = tzCorrectedHour < 12 ? 'AM' : 'PM';
    const time = `${
      timeOfDay === 'AM' ? tzCorrectedHour : tzCorrectedHour - 12
    }:${date.slice(14, 16)} ${timeOfDay}`;

    //get local sent day
    console.log('now: ', now, now.getUTCDate());
    console.log('then: ', time);
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
                    <p className={'chat-match'}>
                      {message.message}
                      <br />
                      <small>Sent: {message.created_at.slice(11, 16)}</small>
                    </p>
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
                    <p className={'user'}>
                      {message.message} <br />
                      <small>Sent: {setTime(message.created_at)}</small>
                      {/* TODO: create function to convert this time to local human readable */}
                    </p>
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
