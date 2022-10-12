import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';

// component of UserProfile meant to ONLY VIEW their info, not editing
export default function ViewUserProfile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // object that contains all of the user's profile info
  const userData = useSelector((state) => state.profile);

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        'Loading Profile...'
      ) : (
        <div>
          <br></br>
          <h1>My Profile:</h1>

          <br></br>
          <img src={userData.avatar_url} height="250px" />
          <p>
            Full name: {userData.firstname} {userData.lastname}
          </p>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>About: {userData.about}</p>
          <p>Location: {userData.location}</p>
          <p>Occupation: {userData.occupation}</p>
          <p>Smokes? {userData.smoker ? 'Yes' : 'No'}</p>
          <p>Drinks? {userData.drinker ? 'Yes' : 'No'}</p>
          <p>Priority: {userData.priority}</p>
          <p>Love Language (giving): {userData.loveLangGiving}</p>
          <p>Love Language (receiving): {userData.loveLangReceiving}</p>
          <p>Your Interests:</p>
          <ul>
            {userData.user_interests?.map((tag) => (
              <li>{tag.label}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <button
          className="button block"
          onClick={() => dispatch(logoutUser(Router))}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
