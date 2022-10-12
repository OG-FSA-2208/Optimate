//channel of messages between looged in user and particular user with :id
//if userA does not have userB as a "match" this should go to 404
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Matches from '../../components/Matches';
import Chatroom from '../../components/Chatroom';

export default function Chat() {
  const [width, setWidth] = useState(null);
  const router = useRouter();
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    if (!matches.some((match) => match.id === router.query.id))
      router.push('/404');
  }, [matches]);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="messages" style={{ display: 'flex', alignItems: 'center' }}>
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
