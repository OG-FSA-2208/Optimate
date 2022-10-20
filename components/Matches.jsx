import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';
import { clickMessages } from '../store/reducers/messengerSlice';

export default function Matches() {
  const router = useRouter();
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const currUser = useSelector((state) => state.profile);
  const messages = useSelector((state) => state.messenger.messages);

  //calculate distance between two lats and longs
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 3961; // radius of earth in miles
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  useEffect(() => {
    //TODO: is this still neeeded?
    if (!matches.length) dispatch(getAllUserMatches());
  }, []);

  return (
    <>
      <h1>MATCHES</h1>
      {matches.map((user) => (
        <div key={user.id}>
          <p className="distance">
            {Math.round(
              calcCrow(
                Number(currUser.latitude),
                Number(currUser.longitude),
                Number(user.latitude),
                Number(user.longitude)
              )
            )}{' '}
            miles away
          </p>
          <Link href={`/messages/${user.id}`}>
            <a
              className={`match ${
                router.query.id === user.id ? 'active-match' : ''
              }`}
              onClick={() => dispatch(clickMessages(user.id, messages))}
            >
              <Badge
                color="primary"
                badgeContent={
                  messages?.filter(
                    (message) =>
                      message.from === user.id && message.read === false
                  ).length
                }
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
