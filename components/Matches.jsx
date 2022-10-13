import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageUser } from '../store/reducers/messengerSlice';
import { getAllUserMatches } from '../store/reducers/matchesSlice';
import { getMessages } from '../store/reducers/messengerSlice';

//will need to get active chat userID from store and set one of the links to have active classname here

export default function Matches() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    if (!matches.length) dispatch(getAllUserMatches());
    dispatch(getMessages());
  }, []);

  return (
    <div className="match-list">
      <ul>
        {matches.map((user) => (
          <li key={user.id}>
            <Link href={`/messages/${user.id}`}>
              <a onClick={() => dispatch(setMessageUser(user.id))}>
                {/* <img
                  src={user.avatar_url}
                  alt="user profile image"
                  height="100"
                  width="100"
                /> */}
                <p>
                  {user.firstname}
                  <br />
                  {user.lastname}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
