import React from 'react';

export default function Chatroom() {
  function handleSend() {
    //TODO: handle clicking send
  }

  function handleEnter(e) {
    //TODO: handle cliking enter, send message to database
  }
  function handleChange(e) {
    //TODO: dispatch e.target.value to store recieve it then set the value
  }

  return (
    <div className="chatroom">
      <div className="chats">
        {/* get old messages from store with useSelector */}
        <p>view all the old chats here</p>
        <p>probably each as their own paragraph</p>
        <p>change conatiner box based on from ID</p>
      </div>
      <div>
        <input
          className="chat-input"
          type="text"
          placeholder="Say something nice!"
          onChange={handleChange}
          onKeyDown={handleEnter}
          //   set value to something from store/useSelector
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
