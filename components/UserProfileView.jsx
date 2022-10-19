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
          <div id="profileEditAvatar">
            <div id="avatarSection">
              <img src={userData?.avatar_url || ''} alt={userData?.avatar_url ? `the user's profile image`
              : `the user has not added a profile picture yet`}/>
            </div>
            <div>
              <h2>{(userData?.firstname || 'You have not provided your name yet') + ' ' + (userData?.lastname || '')}</h2>
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
                <p>{userData?.gender || 'You have not provided your gender yet'}</p>
              </div>
              <div>
                <h3>Location</h3>
                <p>{userData?.location || 'You have not provided your location yet'}</p>
                <button onClick={updateUserLocation}>Update Location</button>
              </div>
            </div>
          </div>
          <hr/>
          <div id='optionalPhotoUploads'>
            {userData?.user_photos?.map((photoURL, ind) =>
            <UserPhoto key={ind} imgData={{imgURL: photoURL, index: ind}}
            userData={userData} onView={true}/>)}
          </div>
          <hr/>
          <div className="profile-info">
            <div className="profile-user">
              <div>
                <h3>Occupation</h3>
                <p>{userData?.occupation || 'Unemployed'}</p>
              </div>
            <div>
              <h3>Smokes</h3>
              <p>{userData?.smoker ? 'Yes, I smoke' : `No, I don't smoke at all`}</p>
            </div>
          <div>
            <h3>Drinks Alcohol</h3>
            <p>{userData?.drinker ? 'Yes, I drink alcohol' : `No, I don't drink alcohol at all`}</p>
          </div>
          {/* this is the select-dropdown-checkbox for interests!!!! */}
          <div>
            <h3>User Interests:</h3>
            <ul>{userData?.user_interests?.length > 0 ? 
                userData?.user_interests?.map(interest => <li key={interest.value}>{interest.label}</li>)
                : 'This user has no interests'}</ul>
          </div>
          <div>
            <h3>Your love language (giving)</h3>
            <p>{userData?.loveLangGiving || 'You have not selected any yet'}</p>
          </div>
          <div>
            <h3>Your love language (receiving)</h3>
            <p>{userData?.loveLangReceiving || 'You have not selected any yet'}</p>
          </div>
          <div>
            <h3>Your top priority</h3>
            <p>{userData?.priority || 'You currently do not have any priority'}</p>
          </div>
        </div>
        {/* THIS IS WHERE A USER'S PARTNER PREFERENCES GO */}
        <div className="profile-preference">
          <h2>Partner Preferences</h2>
          <div>
            <h3 htmlFor="wantedAge">Age range:</h3>
            <span>From </span>
            <input
              name="wantedAge"
              type="number"
              value={userData?.ageMin || userData?.age - 1}
              onChange={(e) => setUserData({ ...userData, ageMin: e.target.value })
              }
            />
            <span> to </span>
            <input
              name="wantedAge"
              type="number"
              value={userData?.ageMax || userData?.age + 1}
              onChange={(e) => setUserData({ ...userData, ageMax: e.target.value })
              }
            />
          </div>
          <div>
            <h3 htmlFor="wanted-gender">Preferred gender</h3>
            <select
              value={
                userData?.genderPreference ? userData?.genderPreference : 'null'
              }
              onChange={(e) =>
                e.target.value !== 'null'
                  ? setUserData({
                      ...userData,
                      genderPreference: e.target.value,
                    })
                  : setUserData({ ...userData, genderPreference: null })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary/Genderfluid">
                Non-binary/Genderfluid
              </option>
              <option value="null">No Preference</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <h3>Smokes?</h3>
            <input
              value={true}
              checked={userData?.smokingPreference}
              type="radio"
              name="smokerPref"
              onChange={(e) =>
                setUserData({ ...userData, smokingPreference: true })
              }
            />{' '}
            Yes, I want them to be a smoker
            <br />
            <input
              value={false}
              checked={
                typeof userData?.smokingPreference === 'boolean' &&
                !userData?.smokingPreference
              }
              type="radio"
              name="smokerPref"
              onChange={(e) =>
                setUserData({ ...userData, smokingPreference: false })
              }
            />{' '}
            No, I don't want them to be a smoker
            <br />
            <input
              value={undefined}
              checked={userData?.smokingPreference === null}
              type="radio"
              name="smokerPref"
              onChange={(e) =>
                setUserData({ ...userData, smokingPreference: null })
              }
            />{' '}
            No real preference
          </div>
          <div>
            <h3>Drinks?</h3>
            <input
              value={true}
              checked={userData?.drinkingPreference}
              type="radio"
              name="drinkingPref"
              onChange={(e) =>
                setUserData({ ...userData, drinkingPreference: true })
              }
            />{' '}
            Yes, I want them to drink alcohol
            <br />
            <input
              value={false}
              checked={
                typeof userData?.drinkingPreference === 'boolean' &&
                !userData?.drinkingPreference
              }
              type="radio"
              name="drinkingPref"
              onChange={(e) =>
                setUserData({ ...userData, drinkingPreference: false })
              }
            />{' '}
            No, I don't want them to drink any alcohol
            <br />
            <input
              value={undefined}
              checked={userData?.drinkingPreference === null}
              type="radio"
              name="drinkingPref"
              onChange={(e) =>
                setUserData({ ...userData, drinkingPreference: null })
              }
            />{' '}
            No real preference
          </div>
          <div>
            <h3 htmlFor="partner-priority">Prioritizes</h3>
            <select
              value={userData?.priorityPreference || 'unselected'}
              onChange={(e) =>
                setUserData({ ...userData, priorityPreference: e.target.value })
              }
            >
              <option value="unselected">Unsure/Don't Care</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Children">Children</option>
              <option value="Work">Work/Job</option>
              <option value="Self-care">Selfcare</option>
            </select>
          </div>
          <div>
            <h3>Match by Love Languages?</h3>
            <input
              value={true}
              checked={userData?.matchByLL}
              type="radio"
              name="matchLL"
              onChange={(e) => setUserData({ ...userData, matchByLL: true })}
            />{' '}
            Yes, this is important to me
            <br />
            <input
              value={false}
              checked={!userData?.matchByLL}
              type="radio"
              name="matchLL"
              onChange={(e) => setUserData({ ...userData, matchByLL: false })}
            />{' '}
            No, I don't mind a mismatch
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
