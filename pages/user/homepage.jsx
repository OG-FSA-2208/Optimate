import Account from '../../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';

//want user who is logged in to have his/her profile rendered on page with their matches
//matches include imageUrl, interests,

//

export default function Profile() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(getAllUserMatches());
  }, []);

  return (
    <div>
      {/* hello */}
      {matches.map((match) => {
        return <div key={match}>{match}</div>;
      })}
    </div>
  );
}
