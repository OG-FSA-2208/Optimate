import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { getLoggedInUser, getUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';
import supabase from '../config/supabaseClient';

// component of UserProfile meant to ONLY VIEW their info, not editing
export default function ViewUserProfile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // object that contains all of the user's profile info
  const userData = useSelector((state) => state.profile);

  console.log(userData);

  const updateUserLocation = async () => {
    const successCallback = async (position) => {
      let userLong = await position.coords.longitude;
      let userLat = await position.coords.latitude;
      // console.log(userLong, userLat)

      const { data, error } = await supabase
        .from('profiles')
        .update({ latitude: +userLat, longitude: userLong })
        .eq('id', userData?.id)
        .select();

      console.log(data);

      if (error) {
        console.log(error);
      }
    };
    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  return (
    <div className="profile-view">
      {loading ? (
        'Loading Profile...'
      ) : (
        <div>
          <button onClick={updateUserLocation}>Update Location</button>
          <img src={userData?.avatar_url} height="250px" />
          <p>
            Full name: {userData?.firstname || '(no name)'} {userData?.lastname}
          </p>
          <p>Age: {userData?.age || '(no age)'}</p>
          <p>Gender: {userData?.gender || 'unselected'}</p>
          <p>About: {userData?.about}</p>
          <p>Location: {userData?.location}</p>
          <p>Occupation: {userData?.occupation}</p>
          <p>Smokes? {userData?.smoker ? 'Yes' : 'No'}</p>
          <p>Drinks? {userData?.drinker ? 'Yes' : 'No'}</p>
          <p>Priority: {userData?.priority}</p>
          <p>Love Language (giving): {userData?.loveLangGiving}</p>
          <p>Love Language (receiving): {userData?.loveLangReceiving}</p>
          <p>Your Interests:</p>
          <p>{userData?.user_interests?.map((tag) => tag.label).join(', ')}</p>
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
