import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';
import supabase from '../config/supabaseClient';
import { getInterestTypes } from '../store/reducers/surveySlice';
import Option from './Option';
import { default as ReactSelect } from 'react-select';

export default function EditUserProfile({ session }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);  // state that shows whether or not a user's info has been successfully updated
  // object that contains all of the user's profile info
  const [userData, setUserData] = useState(useSelector((state) => state.profile));
  const interestTags = useSelector(state => state.survey);

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(getInterestTypes());
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // this useEffect is so the updated profile image shows in the editing view
    // >> does not update it on the server end yet!
  }, [userData])

  async function updateProfile(data) {
    try {
      setLoading(true);
      dispatch(updateUser(data, data.id));
      setUpdated(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(e) {
    const avatarFile = e.target.files[0];
    // caching issue happens here!!!
    // await supabase.storage.from('avatars').remove([`${userData.firstname}_avatar`]);
    // const {data} = await supabase.storage.from('avatars')
    //   .upload(`${userData.firstname}_avatar`, avatarFile, {upsert: true})
    // const { publicURL, imgError } = await supabase
    //   .storage
    //   .from('avatars')
    //   .getPublicUrl(`${userData.firstname}_avatar`);

    // backup plan...
    const {data} = await supabase.storage.from('avatars')
        .upload(`${userData.id}_${avatarFile.name}`, avatarFile, {upsert: true});
    const { publicURL, imgError } = await supabase
      .storage
      .from('avatars')
      .getPublicUrl(`${userData.id}_${avatarFile.name}`);

    setUserData({...userData, avatar_url: publicURL});
  }

  const handleChange = data => {
    if(data.length > 5) {
      alert('Too many tags! Please select only 5 :)');
      data.pop();
    } else {
      setUserData({...userData, user_interests: data});
    }
    console.dir(data);
  }

  return (
    <div className='edit-view'>
      <hr/>
      <h2>Basic Info</h2>
      {/* !!! THIS IS THERE THE BASIC INFO IN EDIT PROFILE IS */}
      <div id='profileEditAvatar'>
        <div>
          <img src={userData.avatar_url}/>
          <label htmlFor="avatar" id='avatar-upload'>Change Profile Photo</label><br/>
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
              value={userData.firstname || ''}
              onChange={(e) => setUserData({...userData, firstname: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              value={userData.lastname || ''}
              onChange={(e) => setUserData({...userData, lastname: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="about">About You</label>
            <textarea
              id="about"
              value={userData.about || ''} rows='5' cols='40'
              onChange={(e) => setUserData({...userData, about: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={userData.age || ''}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select value={userData.gender || 'unselected'} onChange={(e) => setUserData({...userData, gender: e.target.value})}>
              <option disabled value='unselected'>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Non-binary/Genderfluid'>Non-binary/Genderfluid</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor='location'>location</label>
            <input id='location' type='text' value={userData.location || ''} onChange={(e) => setUserData({...userData, location: e.target.value})}/>
          </div>
        </div>
      </div>
      <hr/>
      {/* THINGS HERE ARE BELOW THE HORIZONTAL LINE */}
      <div className='profile-info'>
        {/* THIS IS WHERE A USER'S DETAILED PROFILE INFO IS */}
        <div className='profile-user'>
          <h2>Detailed Info</h2>
          <div> {/* user's occupation */}
            <label htmlFor='occupation'>Occupation</label>
            <input id='occupation' type='text' value={userData.occupation || ''} onChange={(e) => setUserData({...userData, occupation: e.target.value})}/>
          </div>
          <div> {/* user's smoking status */}
            <p>Do you smoke?</p>
            <input id='smoke' value={true} checked={userData.smoker} type='radio'
            name='smoker' onChange={(e) => setUserData({...userData, smoker: true})}
            /> Yes, I smoke
            <br/>
            <input id='nonsmoke' value={false} checked={!userData.smoker} type='radio'
            name='smoker' onChange={(e) => setUserData({...userData, smoker: false})}
            /> No, I don't smoke at all
          </div>
          <div> {/* user's drinking status */}
            <p>Do you drink alcohol?</p>
            <input id='drinks' value={true} checked={userData.drinker}
            name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: true})}
            /> Yes, I drink alcohol
            <br/>
            <input id='nodrinks' value={false} checked={!userData.drinker}
            name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: false})}
            /> No, I don't drink alcohol at all
          </div>
          {/* this is the select-dropdown-checkbox for interests!!!! */}
          <div>
            <label htmlFor='interest-select'>Select up to 5 interests</label>
            <ReactSelect
              options={interestTags?.map(tag => {return {value: tag.id, label: tag.name}})}
              isMulti closeMenuOnSelect={false} hideSelectedOptions={false} id='interest-select'
              components={{Option}} value={userData.user_interests} onChange={handleChange}
            />
          </div>
          <div> {/* user's love language (giving) */}
            <label htmlFor='loveGiving'>Your love language (giving)</label>
            <select value={userData.loveLangGiving || 'unselected'} onChange={(e) => setUserData({...userData, loveLangGiving: e.target.value})}>
              <option value='unselected'>Unsure/Don't Care</option>
              <option value='Physical Touch'>Physical Touch</option>
              <option value='Acts of Service'>Acts of Service</option>
              <option value='Quality Time'>Quality Time</option>
              <option value='Gift Giving'>Gift Giving</option>
              <option value='Words of Affirmation'>Words of Affirmation</option>
            </select>
          </div>
          <div> {/* user's love language (receiving) */}
            <label htmlFor='loveRecieving'>Your love language (receiving)</label>
            <select value={userData.loveLangReceiving || 'unselected'} onChange={(e) => setUserData({...userData, loveLangReceiving: e.target.value})}>
              <option value='unselected'>Unsure/Don't Care</option>
              <option value='Physical Touch'>Physical Touch</option>
              <option value='Acts of Service'>Acts of Service</option>
              <option value='Quality Time'>Quality Time</option>
              <option value='Gift Giving'>Gift Giving</option>
              <option value='Words of Affirmation'>Words of Affirmation</option>
            </select>
          </div>
          <div> {/* user's priority */}
            <label htmlFor='priority'>Your top priority</label>
            <select value={userData.priority || 'unselected'} onChange={(e) => setUserData({...userData, priority: e.target.value})}>
              <option value='unselected'>Unsure/Don't Care</option>
              <option value='Family'>Family</option>
              <option value='Friends'>Friends</option>
              <option value='Children'>Children</option>
              <option value='Work'>Work/Job</option>
              <option value='Self-care'>Selfcare</option>
            </select>
          </div>
        </div>
        {/* THIS IS WHERE A USER'S PARTNER PREFERENCES GO */}
        <div className='profile-preference'>
          <h2>Partner Preferences</h2>
          <div>
            <label htmlFor='wanted-age'>Desired age range:</label>
            <input id='wanted-age' type='text' value={userData.wantAge || ''} onChange={(e) => setUserData({...userData, wantAge: e.target.value})}/>
          </div>
          <div>
            <label htmlFor='wanted-occupation'>Desired partner occupation:</label>
            <input id='wanted-occupation' type='text' value={userData.wantOccupation || ''} onChange={(e) => setUserData({...userData, wantOccupation: e.target.value})}/>
          </div>
          <div>
            <label htmlFor="wanted-gender">Preferred partner gender</label>
            <select value={userData.wantGender || 'unselected'} onChange={(e) => setUserData({...userData, wantGender: e.target.value})}>
              <option disabled value='unselected'>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Non-binary/Genderfluid'>Non-binary/Genderfluid</option>
              <option value='No preference'>No Preference</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
      </div>
      {/* BELOW DIV IS THE BUTTON TO UPDATE ALL THE userData NEWLY SET */}
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile(userData)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <div>{updated ? 'Profile updated' : ''}</div>
      </div>
    </div>
  );
}
