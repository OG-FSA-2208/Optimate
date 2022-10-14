import { useState } from 'react';
import UserProfileView from './UserProfileView';
import UserProfileEdit from './UserProfileEdit';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// this component only toggles between displaying the view/edit components for UserProfile
export default function UserProfile({ session }) {
  const [editing, setEditing] = useState(false);  // state that determines whether user is viewing or editing their info

  const toggleEdit = (e) => {
    setEditing(!editing);
  }

  return (
    <div className="form-widget">
      <h1>{editing ? 'Editing Profile' : 'Your Profile'}
      <button className="button block" id='editToggle' onClick={() => toggleEdit()}>{editing ? <><ArrowBackIcon/> Return to Profile View</> : <>Edit Profile <EditIcon/></>}</button>
      </h1>
      <hr/>
      {editing ? <UserProfileEdit/> : <UserProfileView/>}
    </div>
  );
}
