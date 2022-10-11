//channel of messages between looged in user and particular user with :id
//if userA does not have userB as a "match" this should go to 404
import { useState, useEffect } from 'react';
import Matches from '../../components/Matches';
import Chatroom from '../../components/Chatroom';

export default function Chat() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="messages">
      {/* this will look very similar to index on desktop, mobile will have the match list component disappear */}
      <div style={width <= 768 ? { display: 'none' } : {}} className="column">
        <Matches />
      </div>
      <div className="column">
        <Chatroom />
      </div>
    </div>
  );
}
