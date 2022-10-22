//channel of messages between looged in user and particular user with :id
//if userA does not have userB as a "match" this should go to 404
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Matches from '../../components/Matches';
import Chatroom from '../../components/Chatroom';
import Head from 'next/head';
import Link from 'next/link';
import { clickMessages } from '../../store/reducers/messengerSlice';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

export default function Chat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const messages = useSelector((state) => state.messenger.messages);

  // this is the match object that a user clicks on
  const match = matches.find((match) => match.id === router.query.id);

  useEffect(() => {
    if (router.query.id) {
      if (!matches.some((match) => match.id === router.query.id))
        router.push('/404');
      else dispatch(clickMessages(router.query.id, messages));
    }
  }, [matches]);

  return (
    <div className="messages">
      <Head>
        <title>
          Optimate | Messages{' '}
          {match ? `- ${match.firstname} ${match.lastname}` : ``}
        </title>
      </Head>
      <div className="column match-list">
        <Matches />
      </div>
      <div className="column chatMessageBox">
        <Link href="/messages">
          <ArrowCircleLeftOutlinedIcon className="back" />
        </Link>
        <Chatroom />
      </div>
    </div>
  );
}
