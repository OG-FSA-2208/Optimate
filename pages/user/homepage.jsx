import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const matches = useSelector((state) => state.matches);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllUserMatches());
  }, [toggle]); // need toggle here or else page gives hydration error 

  const handleClick = (event) => {
    event.target.parentElement.parentElement.classList.toggle('active');
    setToggle(!toggle);
  };

  return (
    <div>
      {profile.id ? (
        <div>
          <div className="myProfile">
            <br></br>
            <h2>My Profile:</h2>

            <br></br>
            <img src={profile.avatar_url} className="profilePic" />
            <p>
              Full name: {profile.firstname} {profile.lastname}
            </p>
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>
            <p>About: {profile.about}</p>
          </div>
          <div className="media-scroller">
            <div className="matchesForEachUser">
              {matches
                ? matches.map((match) => {
                    return (
                      <div className="matches" key={match.id}>
                        <h3>
                          {match.firstname} {match.lastname}
                        </h3>
                        <p>
                          <img
                            className="matchesProfilePic"
                            src={match.avatar_url}
                            alt="Profile Pic"
                          />
                        </p>
                        <p>Age: {match.age}</p>
                        <p>Gender: {match.gender}</p>
                        <p>Highlight: {match.highlight}</p>
                        <div className="matchesAboutMe">
                          About: {match.about}
                        </div>
                        <p>Occupation: {match.occupation}</p>
                        <p>Status: {match.status}</p>
                        <p>Location: {match.location}</p>
                        <p>Love Language (Giving): {match.loveLangGiving}</p>
                        <p>
                          Love Language (Receiving): {match.loveLangReceiving}
                        </p>
                        <div className="toggle">
                          <OpenInNewIcon
                            onClick={(event) => handleClick(event)}
                          />
                        </div>
                      </div>
                    );
                  })
                : 'Sorry, but you have 0 matches'}
            </div>
          </div>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
