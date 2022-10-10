import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllUserMatches());
  }, []);

  return (
    <div>
      {profile.id ? (
        <div>
          <div className="myProfile">
            <br></br>
            <h1>My Profile:</h1>

            <br></br>
            <img src={profile.avatar_url} className="profilePic" />
            <p>
              Full name: {profile.firstname} {profile.lastname}
            </p>
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <p>About: {profile.about}</p>
          </div>
          <div className="matchesForEachUser">
            {matches
              ? matches.map((match) => {
                  return (
                    <div className="matches" key={match.id}>
                      {match.firstname} {match.lastname}
                      <p>
                        <img
                          className="matchesProfilePic"
                          src={match.avatar_url}
                          alt="Profile Pic"
                        />
                      </p>
                      <p>Age: {match.age}</p>
                      <p>Gender: {match.gender}</p>
                      <p>About: {match.about}</p>
                    </div>
                  );
                })
              : 'Sorry, but you have 0 matches'}
          </div>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
