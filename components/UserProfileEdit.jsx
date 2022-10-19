import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as ReactSelect } from 'react-select';
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp';
import { updateUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import { clearSurvey, getInterestTypes, uploadAvatar, uploadImages } from '../store/reducers/surveySlice';
import Option from './Option';
import UserPhoto from './UserPhoto';

export default function EditUserProfile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false); // state that shows whether or not a user's info has been successfully updated
  // object that contains all of the user's profile info
  const [userData, setUserData] = useState(useSelector((state) => state.profile));
  const interestTags = useSelector(state => state.survey.tags);
  const user_avatar = useSelector(state => state.survey.avatar_url || userData.avatar_url)
  const user_photos = useSelector(state => state.survey.user_photos || userData.user_photos);

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(clearSurvey());  // clears the store so if there was unsaved uploaded data previously, it gets wiped
    dispatch(getInterestTypes());
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  useEffect(() =>{
    setUserData({...userData, avatar_url: user_avatar, user_photos});
  }, [user_avatar, user_photos])
  
  async function updateProfile() {
    try {
      setLoading(true);
      if (userData?.about?.length > 250) {
        throw new Error(`'About You' section is ${userData?.about.length - 250} character(s) over limit. Please adjust the length and try again`);
      } else if (userData?.age < 18) {
        throw new Error(`The age you have provided seems to be a little low. We would like to discourage you from further use of this app`);
      } else if (!userData?.firstname) {
        throw new Error(`Please provide your first name`);
      } else if (!userData?.lastname) {
        throw new Error(`Please provide your last name`);
      } else if (!userData?.age) {
        throw new Error(`Please provide your age`);
      } else if (!userData?.gender) {
        throw new Error(`Please provide your gender`);
      } else if (!userData?.avatar_url) {
        throw new Error(`Please provide a profile image`);
      }
      dispatch(updateUser(userData, userData.id));
      setUpdated(true);
      setTimeout(() => setUpdated(false), 8000);  // this isn't working quite correctly yet
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(e) {
    const avatarFile = e.target.files[0];
    dispatch(uploadAvatar(avatarFile, userData));
  }

  async function handleImageUpload(e) {
    const imageFiles = [...e.target.files];
    if (imageFiles.length + userData?.user_photos.length > 4) {
      alert(`Too many photos! You can only upload ${4 - userData?.user_photos.length} additional image(s)`);
      return;
    }
    dispatch(uploadImages(imageFiles, userData));
  }

  const handleChange = (data) => {
    if (data.length > 5) {
      alert('Too many tags! Please select only 5 :)');
      data.pop();
    } else {
      setUserData({ ...userData, user_interests: data });
    }
    console.dir(data);
  };

  return (
    <div className="edit-view">
      <h2>Basic Info</h2>
      {/* !!! THIS IS THERE THE BASIC INFO IN EDIT PROFILE IS */}
      <div id="profileEditAvatar">
        <div id="avatarSection">
          <img src={userData?.avatar_url || ''} />
          <label htmlFor="avatar" id="avatar-upload">
            Change Profile Photo
          </label>
          <br />
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </div>
        <div>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              value={userData?.firstname || ''}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              value={userData?.lastname || ''}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="about">About You</label>
            <h5>{250 - (userData?.about?.length || 0)} characters remaining</h5>
            <textarea
              id="about"
              value={userData?.about || ''}
              rows="6"
              cols="40"
              onChange={(e) =>
                setUserData({ ...userData, about: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={userData?.age || ''}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              value={userData?.gender || 'unselected'}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
            >
              <option disabled value="unselected">
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary/Genderfluid">
                Non-binary/Genderfluid
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">location</label>
            <input
              id="location"
              type="text"
              value={userData?.location || ''}
              onChange={(e) =>
                setUserData({ ...userData, location: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <hr />
      {/* THIS IS WHERE OPTIONAL IMAGE UPLOADING/DELETING GOES */}
      <h2>Upload up to (4) four additional photos (.png, .jpg types)</h2>
      <i>if adding/removing photos, remember to save your new profile</i>
      <div id='optionalPhotoUploads'>
        {userData?.user_photos?.map((photoURL, ind) =>
        <UserPhoto key={ind} imgData={{imgURL: photoURL, index: ind}}
        userData={userData} setUserData={setUserData}/>)}
        {/* CREATES 'SLOTS' FOR USER TO UPLOAD ANY REMAINING PHOTOS THEY CAN */}
        {userData?.user_photos?.length < 4 ?
        Array.apply(null, Array(4 - userData?.user_photos?.length))
        .map((uploadSlot, ind) => <div key={ind} className="uploadSlot">
          <label htmlFor={`uploadSlot_${ind}`} id='image-upload'><FileUploadSharpIcon/></label><br/>
          <input
            id={`uploadSlot_${ind}`}
            type="file" multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>)
        : <></>}
      </div>
      <hr/>
      {/* THINGS HERE ARE BELOW THE OPTIONAL IMAGES */}
      <div className="profile-info">
        {/* THIS IS WHERE A USER'S DETAILED PROFILE INFO IS */}
        <div className="profile-user">
          <h2>Detailed Info</h2>
          <div>
            {' '}
            {/* user's occupation */}
            <label htmlFor="occupation">Occupation</label>
            <input
              id="occupation"
              type="text"
              value={userData?.occupation || ''}
              onChange={(e) =>
                setUserData({ ...userData, occupation: e.target.value })
              }
            />
          </div>
          <div>
            {' '}
            {/* user's smoking status */}
            <label>Do you smoke?</label>
            <input
              id="smoke"
              value={true}
              checked={userData?.smoker}
              type="radio"
              name="smoker"
              onChange={(e) => setUserData({ ...userData, smoker: true })}
            />{' '}
            Yes, I smoke
            <br />
            <input
              id="nonsmoke"
              value={false}
              checked={!userData?.smoker}
              type="radio"
              name="smoker"
              onChange={(e) => setUserData({ ...userData, smoker: false })}
            />{' '}
            No, I don't smoke at all
          </div>
          <div>
            {' '}
            {/* user's drinking status */}
            <label>Do you drink alcohol?</label>
            <input
              id="drinks"
              value={true}
              checked={userData?.drinker}
              name="alcohol"
              type="radio"
              onChange={(e) => setUserData({ ...userData, drinker: true })}
            />{' '}
            Yes, I drink alcohol
            <br />
            <input
              id="nodrinks"
              value={false}
              checked={!userData?.drinker}
              name="alcohol"
              type="radio"
              onChange={(e) => setUserData({ ...userData, drinker: false })}
            />{' '}
            No, I don't drink alcohol at all
          </div>
          {/* this is the select-dropdown-checkbox for interests!!!! */}
          <div>
            <label htmlFor="interest-select">Select up to 5 interests</label>
            <ReactSelect
              options={interestTags
                ?.map((tag) => {
                  return { value: tag.id, label: tag.name };
                })
                .sort((a, b) => (a.label > b.label ? 1 : -1))}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              id="interest-select"
              components={{ Option }}
              value={userData?.user_interests}
              onChange={handleChange}
            />
          </div>
          <div>
            {' '}
            {/* user's love language (giving) */}
            <label htmlFor="loveGiving">Your love language (giving)</label>
            <select
              value={userData?.loveLangGiving || 'unselected'}
              onChange={(e) =>
                setUserData({ ...userData, loveLangGiving: e.target.value })
              }
            >
              <option value="unselected">Unsure/Don't Care</option>
              <option value="Physical Touch">Physical Touch</option>
              <option value="Acts of Service">Acts of Service</option>
              <option value="Quality Time">Quality Time</option>
              <option value="Gift Giving">Gift Giving</option>
              <option value="Words of Affirmation">Words of Affirmation</option>
            </select>
          </div>
          <div>
            {' '}
            {/* user's love language (receiving) */}
            <label htmlFor="loveRecieving">
              Your love language (receiving)
            </label>
            <select
              value={userData?.loveLangReceiving || 'unselected'}
              onChange={(e) =>
                setUserData({ ...userData, loveLangReceiving: e.target.value })
              }
            >
              <option value="unselected">Unsure/Don't Care</option>
              <option value="Physical Touch">Physical Touch</option>
              <option value="Acts of Service">Acts of Service</option>
              <option value="Quality Time">Quality Time</option>
              <option value="Gift Giving">Gift Giving</option>
              <option value="Words of Affirmation">Words of Affirmation</option>
            </select>
          </div>
          <div>
            {' '}
            {/* user's priority */}
            <label htmlFor="priority">Your top priority</label>
            <select
              value={userData?.priority || 'unselected'}
              onChange={(e) =>
                setUserData({ ...userData, priority: e.target.value })
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
        </div>
        {/* THIS IS WHERE A USER'S PARTNER PREFERENCES GO */}
        <div className="profile-preference">
          <h2>Partner Preferences</h2>
          <div>
            <label htmlFor="wantedAge">Age range:</label>
            <span>From </span>
            <input
              name="wantedAge"
              type="number"
              value={userData?.ageMin || userData?.age - 1}
              onChange={(e) =>
                e.target.value < 18
                  ? alert('Too low. Please choose an age 18 or above')
                  : setUserData({ ...userData, ageMin: e.target.value })
              }
            />
            <span> to </span>
            <input
              name="wantedAge"
              type="number"
              value={userData?.ageMax || userData?.age + 1}
              onChange={(e) =>
                e.target.value < userData?.ageMin
                  ? alert(
                      'Too low. Please choose an age above your selected minimum'
                    )
                  : setUserData({ ...userData, ageMax: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="wanted-gender">Preferred gender</label>
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
            <label>Smokes?</label>
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
            <label>Drinks?</label>
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
            <label htmlFor="partner-priority">Prioritizes</label>
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
            <label>Match by Love Languages?</label>
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
      {/* BELOW DIV IS THE BUTTON TO UPDATE ALL THE userData NEWLY SET */}
      <hr />
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile()}
          disabled={loading} id='save-profile'
        >
          {loading ? 'Loading ...' : 'Save Profile'}
        </button>
        <div>{updated ? 'Profile updated' : ''}</div>
      </div>
    </div>
  );
}
