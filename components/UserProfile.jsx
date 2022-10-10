import { useState, useEffect } from 'react';
import ViewUserProfile from './ViewUserProfile';
import EditUserProfile from './EditUserProfile';

// this component only toggles between displaying the view/edit components for UserProfile
export default function UserProfile({ session }) {
  const [editing, setEditing] = useState(false);  // state that determines whether user is viewing or editing their info

  const toggleEdit = (e) => {
    setEditing(!editing);
  }

  return (
    <div className="form-widget">
      <button className="button block" onClick={() => toggleEdit()}>{editing ? 'Return to profile' : 'Edit profile'}</button>
      {editing ? <EditUserProfile/> : <ViewUserProfile/>}
    </div>
  );
}
