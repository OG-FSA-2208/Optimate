import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUserMatches } from '../store/reducers/matchesSlice';

export default function Matches() {
  const dispatch = useDispatch();

  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(getAllUserMatches());
  }, []);

  return (
    <div className="match-list">
      <ul>
        {matches.map((user) => (
          <li key={user.id}>
            <img
              src={user.avatar_url}
              alt="user profile image"
              height="100"
              width="100"
            />
            <p>
              {user.firstname}
              <br />
              {user.lastname}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
