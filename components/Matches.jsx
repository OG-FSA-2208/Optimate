import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';
import { getMessages, clickMessages } from '../store/reducers/messengerSlice';

//will need to get active chat userID from store and set one of the links to have active classname here

export default function Matches() {
  const router = useRouter();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    if (!matches.length) dispatch(getAllUserMatches());
    dispatch(getMessages());
  }, []);

  return (
    <>
      <h1>MATCHES</h1>
      {matches.map((user) => (
        <div key={user.id}>
          <Link href={`/messages/${user.id}`}>
            <a
              className={`match ${
                router.query.id === user.id ? 'active-match' : ''
              }`}
              onClick={() => dispatch(clickMessages(user.id))}
            >
              <img
                className="matchPic"
                src={user.avatar_url}
                alt="user profile image"
              />
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
