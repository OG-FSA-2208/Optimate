import { useState, useEffect } from 'react';
import ViewUserProfile from './ViewUserProfile';
import { useDispatch } from 'react-redux';
import { logoutUser, updateUser } from '../store/reducers/userSlice';
import { getLoggedInUser } from '../store/reducers/profileSlice';
import Router from 'next/router';
import { useSelector } from 'react-redux';

export default function UserProfile({ session }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);  // state that determines whether user is viewing or editing their info
  const [updated, setUpdated] = useState(false);  // state that shows whether or not a user's info has been successfully updated
  // object that contains all of the user's profile info
  const [userData, setUserData] = useState(useSelector((state) => state.profile));

  useEffect(() => {
    // dispatching so that userData can grab the profile of the current user
    dispatch(getLoggedInUser());
    setLoading(false);
  }, [dispatch]);

  const toggleEdit = (e) => {
    setEditing(!editing);
  }

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

  return (
    <div className="form-widget">
      <button className="button block" onClick={() => toggleEdit()}>{editing ? 'Return to profile' : 'Edit profile'}</button>
      {editing ? 
      (<div>
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
          {updated ? 'Profile updated' : ''}
        </div>
      </div> )
      : <ViewUserProfile user={userData}/>}
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
