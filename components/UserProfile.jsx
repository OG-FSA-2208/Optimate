import { useState, useEffect } from 'react';
import UserProfileView from './UserProfileView';
import UserProfileEdit from './UserProfileEdit';

// this component only toggles between displaying the view/edit components for UserProfile
export default function UserProfile({ session }) {
  const [editing, setEditing] = useState(false);  // state that determines whether user is viewing or editing their info

  const toggleEdit = (e) => {
    setEditing(!editing);
  }

  return (
    <div className="form-widget">
      <h1>{editing ? 'Editing Profile' : 'Your Profile'}
      <button className="button block" onClick={() => toggleEdit()}>{editing ? 'Return to profile' : 'Edit profile'}</button>
      </h1>
      <hr/>
      {editing ? <UserProfileEdit/> : <UserProfileView/>}
    </div>
  );
}
