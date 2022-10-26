import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { getLoggedInUser, getUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';
import supabase from '../config/supabaseClient';
import UserPhoto from './UserPhoto';

// component of UserProfile meant to ONLY VIEW their info, not editing
export default function ViewUserProfile() {
  const [updateLocationBtn, setUpdateLocationBtn] = useState(
    'Update Precise Location'
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // object that contains all of the user's profile info
  const userData = useSelector((state) => state.profile);

  const updateUserLocation = async () => {
    const successCallback = async (position) => {
      setUpdateLocationBtn('Updating...');
      let userLong = await position.coords.longitude;
      let userLat = await position.coords.latitude;

      const { data, error } = await supabase
        .from('profiles')
        .update({ latitude: +userLat, longitude: userLong })
        .eq('id', userData?.id)
        .select();
      setUpdateLocationBtn('Location Updated!');
      if (error) {
        console.error(error);
      }
    };
    const errorCallback = (error) => {
      console.error(error);
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
          <div id="profileEditAvatar">
            <div id="avatarSection">
              <img
                src={userData?.avatar_url || ''}
                alt={
                  userData?.avatar_url
                    ? `the user's profile image`
                    : `the user has not added a profile picture yet`
                }
              />
            </div>
            <div>
              <h2>
                {(userData?.firstname ||
                  'You have not provided your name yet') +
                  ' ' +
                  (userData?.lastname || '')}
              </h2>
              <div>
                <h3>Your Highlight</h3>
                <p>
                  {userData?.highlight || 'You have not filled this out yet'}
                </p>
              </div>
              <div>
                <h3>About You</h3>
                <p>{userData?.about || 'You have not filled this out yet'}</p>
              </div>
              <div>
                <h3>Age</h3>
                <p>{userData?.age || 'You have not provided your age yet'}</p>
              </div>
              <div>
                <h3>Gender</h3>
                <p>
                  {userData?.gender || 'You have not provided your gender yet'}
                </p>
              </div>
              <div>
                <h3>Location</h3>
                <p>
                  {userData?.location ||
                    'You have not provided your location yet'}
                </p>
                <button onClick={updateUserLocation}>
                  {updateLocationBtn}
                </button>
                <div className="preciseLocationLink">
                  <p>What is Precise Location?</p>
                  <div className="preciseLocationExplanation">
                    Allowing Optimate to use your precise location will enable
                    you to see how far away your matches are! It is
                    completely optional, and Optimate never sells your personal
                    information.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h2>Additional Photo Uploads:</h2>
          <div id="optionalPhotoUploads">
            {userData?.user_photos?.map((photoURL, ind) => (
              <UserPhoto
                key={ind}
                imgData={{ imgURL: photoURL, index: ind }}
                userData={userData}
                onView={true}
              />
            ))}
          </div>
          <hr />
          <div className="profile-info">
            <div className="profile-user">
              <h2>Your Details</h2>
              <div>
                <h3>Occupation</h3>
                <p>{userData?.occupation || 'Unemployed'}</p>
              </div>
              <div>
                <h3>Smokes</h3>
                <p>
                  {userData?.smoker
                    ? 'Yes, I smoke'
                    : `No, I don't smoke at all`}
                </p>
              </div>
              <div>
                <h3>Drinks Alcohol</h3>
                <p>
                  {userData?.drinker
                    ? 'Yes, I drink alcohol'
                    : `No, I don't drink alcohol at all`}
                </p>
              </div>
              <div>
                <h3>User Interests:</h3>
                <ul>
                  {userData?.user_interests?.length > 0
                    ? userData?.user_interests?.map((interest) => (
                        <li key={interest.value}>{interest.label}</li>
                      ))
                    : 'This user has no interests'}
                </ul>
              </div>
              <div>
                <h3>Your love language (giving)</h3>
                <p>
                  {userData?.loveLangGiving || 'You have not selected any yet'}
                </p>
              </div>
              <div>
                <h3>Your love language (receiving)</h3>
                <p>
                  {userData?.loveLangReceiving ||
                    'You have not selected any yet'}
                </p>
              </div>
              <div>
                <h3>Your top priority</h3>
                <p>
                  {userData?.priority ||
                    'You currently do not have any priority'}
                </p>
              </div>
            </div>
            <div className="profile-preference">
              <h2>Partner Preferences</h2>
              <div>
                <h3>Looking for ages:</h3>
                <p>
                  {userData.ageMin ? userData.ageMin : 'N/A'} -{' '}
                  {userData.ageMax ? userData.ageMax : 'N/A'}
                </p>
              </div>
              <div>
                <h3>Preferred gender</h3>
                <p>
                  {userData?.genderPreference
                    ? userData.genderPreference
                    : 'No gender preference'}
                </p>
              </div>
              <div>
                <h3>Smokes?</h3>
                <p>
                  {typeof userData?.smokingPreference !== 'boolean'
                    ? 'No real preference'
                    : userData?.smokingPreference
                    ? 'Yes, I want them to be a smoker'
                    : `No, I don't want them to be a smoker`}
                </p>
              </div>
              <div>
                <h3>Drinks?</h3>
                <p>
                  {typeof userData?.drinkingPreference !== 'boolean'
                    ? 'No real preference'
                    : userData?.drinkingPreference
                    ? 'Yes, I want them to be a drinker'
                    : `No, I don't want them to be a drinker`}
                </p>
              </div>
              <div>
                <h3>Prioritizes</h3>
                <p>
                  {userData?.priorityPreference ||
                    'Partner priority is unimportant to me'}
                </p>
              </div>
              <div>
                <h3>Match by Love Languages?</h3>
                <p>
                  {userData?.matchByLL
                    ? 'Yes, this is important to me'
                    : `No, I don't mind a mismatch`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
