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
        <div>
          <label htmlFor="avatar">Profile Photo</label>
          <img src={userData.avatar_url} height="250px"/>
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
          <input
            id="about"
            type="text"
            value={userData.about || ''}
            onChange={(e) => setUserData({...userData, about: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input
            id="age"
            type="text"
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
    </div>
  );
}
