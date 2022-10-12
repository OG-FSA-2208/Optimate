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

  console.log(interestTags);

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
      alert('Too many tags! Please select only 5 :)')
      data.pop();
    } else {
      setUserData({...userData, user_interests: data});
    }
    console.dir(data);
  }

  return (
    <div>
      <div id='profileEditAvatar'>
        <img src={userData.avatar_url}/><br/>
        <div>
          <label htmlFor="avatar">Profile Photo</label><br/>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </div>
      </div>
      <hr/>
      <div className='profile-info'>
        <div className='profile-user'>
          <div>
            <label htmlFor="firstname">first name</label>
            <input
              id="firstname"
              type="text"
              value={userData.firstname || ''}
              onChange={(e) => setUserData({...userData, firstname: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="lastname">last name</label>
            <input
              id="lastname"
              type="text"
              value={userData.lastname || ''}
              onChange={(e) => setUserData({...userData, lastname: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="about">profile bio</label>
            <textarea
              id="about"
              value={userData.about || ''} rows='5' cols='50'
              onChange={(e) => setUserData({...userData, about: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="age">age</label>
            <input
              id="age"
              type="number"
              value={userData.age || ''}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="gender">gender</label>
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
          <div>
            <label htmlFor='occupation'>occupation</label>
            <input id='occupation' type='text' value={userData.occupation || ''} onChange={(e) => setUserData({...userData, occupation: e.target.value})}/>
          </div>
          <div>
            <p>Do you smoke?</p>
            <label htmlFor='smoke'>Yes, I smoke</label>
            <input id='smoke' value={true} type='radio' name='smoker' onChange={(e) => setUserData({...userData, smoker: e.target.value})}/>
            <br/>
            <label htmlFor='nonsmoke'>No, I don't smoke at all</label>
            <input id='nonsmoke' value={false} type='radio' name='smoker' onChange={(e) => setUserData({...userData, smoker: e.target.value})}/>
          </div>
          <div>
            <p>Do you drink alcohol?</p>
            <label htmlFor='drinks'>Yes, I drink alcohol</label>
            <input id='drinks' value={true} name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: e.target.value})}/>
            <br/>
            <label htmlFor='nodrinks'>No, I don't drink alcohol at all</label>
            <input id='nodrinks' value={false} name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: e.target.value})}/>
          </div>
          {/* this is the select-dropdown-checkbox!!! */}
          <div>
            <label htmlFor='interest-select'>Select up to 5 interests</label>
            <ReactSelect
              options={interestTags?.map(tag => {return {value: tag.id, label: tag.name}})}
              isMulti closeMenuOnSelect={false} hideSelectedOptions={false} id='interest-select'
              components={{Option}} value={userData.user_interests} onChange={handleChange}
            />
          </div>
          <div>
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
          <div>
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
          <div>
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
        <div className='profile-preference'>
          <div>
            <label htmlFor='wanted-age'>Desired age range:</label>
            <input id='wanted-age' type='text' value={userData.wantAge} onChange={() => setUserData({...userData, wantAge: e.target.value})}/>
          </div>
          <div>
            <label htmlFor='wanted-occupation'>Desired partner occupation:</label>
            <input id='wanted-occupation' type='text' value={userData.wantOccupation} onChange={() => setUserData({...userData, wantOccupation: e.target.value})}/>
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
