//channel of messages between looged in user and particular user with :id
//if userA does not have userB as a "match" this should go to 404
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Matches from '../../components/Matches';
import Chatroom from '../../components/Chatroom';
import { clickMessages } from '../../store/reducers/messengerSlice';
import Head from 'next/head';

export default function Chat() {
  const [width, setWidth] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const messages = useSelector((state) => state.messenger.messages);

  // this is the object of the user that a user clicks on
  const match = matches.find((match) => match.id === router.query.id);

  useEffect(() => {
    if (router.query.id) {
      if (!matches.some((match) => match.id === router.query.id))
        router.push('/404');
      else dispatch(clickMessages(router.query.id, messages));
    }
  }, [matches]);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="messages">
      <Head>
          <title>Optimate | Messages {match ? `- ${match.firstname} ${match.lastname}` : ``}</title>
      </Head>
      {/* this will look very similar to index on desktop, mobile will have the match list component disappear */}
      <div
        style={width <= 768 ? { display: 'none' } : {}}
        className="column match-list"
      >
        <Matches />
      </div>
      <div className="column chatMessageBox">
        <Chatroom />
      </div>
    </div>
  );
}
