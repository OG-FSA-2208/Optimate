import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';
import { getMessages, clickMessages } from '../store/reducers/messengerSlice';

export default function Matches() {
  const router = useRouter();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const messages = useSelector((state) => state.messenger.messages);
  //TODO: check messages length for each user?

  useEffect(() => {
    //TODO: is this still neeeded?
    if (!matches.length) dispatch(getAllUserMatches());
  }, []);

  return (
    <>
      <h1>MATCHES</h1>
      {/* check number of unread messages from user.id and set that to the number in badgeContent */}
      {matches.map((user) => (
        <div key={user.id}>
          <Link href={`/messages/${user.id}`}>
            <a
              className={`match ${
                router.query.id === user.id ? 'active-match' : ''
              }`}
              onClick={() => dispatch(clickMessages(user.id))}
            >
              <Badge
                color="primary"
                badgeContent={10}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                max={9}
              >
                <img
                  className="matchPic"
                  src={user.avatar_url}
                  alt="user profile image"
                />
              </Badge>
              <h2>
                {user.firstname}
                <br />
                {user.lastname}
              </h2>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}
