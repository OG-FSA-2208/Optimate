import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import { useSelector } from 'react-redux';
import supabase from '../config/supabaseClient';

export default function EditUserProfile({ session }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);  // state that shows whether or not a user's info has been successfully updated
  // object that contains all of the user's profile info
  const [userData, setUserData] = useState(useSelector((state) => state.profile));

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {

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
    const avatarFile = e.target.files[0]
    // caching issue happens here!!!
    // const {data} = await supabase.storage.from('avatars')
    //   .upload(`${userData.firstname}_avatar`, avatarFile, {upsert: true})
    // const { publicURL, imgError } = await supabase
    //   .storage
    //   .from('avatars')
    //   .getPublicUrl(`${userData.firstname}_avatar`);

    // backup plan...
    const {data} = await supabase.storage.from('avatars')
        .upload(`${avatarFile.name}`, avatarFile, {upsert: true});
    const { publicURL, imgError } = await supabase
      .storage
      .from('avatars')
      .getPublicUrl(`${avatarFile.name}`);


    console.log(publicURL);
    setUserData({...userData, avatar_url: publicURL});
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="avatar">Profile Photo</label><br/>
        <img src={userData.avatar_url} height="300px"/>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
      </div>
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
          value={userData.about || ''} rows='5' cols='75'
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
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='nb'>Non-binary</option>
          <option value='other'>Other</option>
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
        <input id='smoke' value={true} checked={userData.smoker} type='radio' name='smoker' onSelect={(e) => setUserData({...userData, smoker: e.target.value})}/>
        <br/>
        <label htmlFor='nonsmoke'>No, I don't smoke at all</label>
        <input id='nonsmoke' value={false} checked={!userData.smoker} type='radio' name='smoker' onSelect={(e) => setUserData({...userData, smoker: e.target.value})}/>
      </div>
      <div>
        <p>Do you drink alcohol?</p>
        <label htmlFor='drinks'>Yes, I drink alcohol</label>
        <input id='drinks' value={true} checked={userData.drinker} name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: e.target.value})}/>
        <br/>
        <label htmlFor='nodrinks'>No, I don't think alcohol at all</label>
        <input id='nodrinks' value={false} checked={!userData.drinker} name='alcohol' type='radio' onChange={(e) => setUserData({...userData, drinker: e.target.value})}/>
      </div>
      <div>
        <label htmlFor='loveGiving'>Your love language (giving)</label>
        <select value={userData.loveLangGiving || 'unselected'} onChange={(e) => setUserData({...userData, loveLangGiving: e.target.value})}>
          <option value='unselected'>Unsure/Don't Care</option>
          <option value='physical'>Physical Touch</option>
          <option value='acts'>Acts of Service</option>
          <option value='time'>Quality Time</option>
          <option value='gifts'>Gift Giving</option>
          <option value='words'>Words of Affirmation</option>
        </select>
      </div>
      <div>
        <label htmlFor='loveRecieving'>Your love language (recieving)</label>
        <select value={userData.loveLangRecieving || 'unselected'} onChange={(e) => setUserData({...userData, loveLangRecieving: e.target.value})}>
          <option value='unselected'>Unsure/Don't Care</option>
          <option value='physical'>Physical Touch</option>
          <option value='acts'>Acts of Service</option>
          <option value='time'>Quality Time</option>
          <option value='gifts'>Gift Giving</option>
          <option value='words'>Words of Affirmation</option>
        </select>
      </div>
      <div>
        <label htmlFor='priority'>Your top priority</label>
        <select value={userData.priority || 'unselected'} onChange={(e) => setUserData({...userData, priority: e.target.value})}>
          <option value='unselected'>Unsure/Don't Care</option>
          <option value='family'>Family</option>
          <option value='friends'>Friends</option>
          <option value='children'>Children</option>
          <option value='work'>Work/Job</option>
          <option value='self'>Selfcare</option>
        </select>
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
