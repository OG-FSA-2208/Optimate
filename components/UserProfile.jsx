import { useState } from 'react';
import UserProfileView from './UserProfileView';
import UserProfileEdit from './UserProfileEdit';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

// this component only toggles between displaying the view/edit components for UserProfile
export default function UserProfile({ session }) {
  const [editing, setEditing] = useState(false);  // state that determines whether user is viewing or editing their info

  const toggleEdit = (e) => {
    setEditing(!editing);
  }

  return (
    <div className="form-widget">
      <h1>{editing ? 'Editing Profile' : 'Your Profile'}</h1>
      <button className="button block editToggle" onClick={() => toggleEdit()}>
        {editing ? <div><ArrowBackIcon/><>&nbsp;Return to Profile View</></div>
        : <div><>Edit Profile&nbsp;</><EditIcon/></div>}
      </button>
      <button className="button block editToggle"><Link href="/user/settings">User Settings</Link></button>
      <hr/>
      {editing ? <UserProfileEdit/> : <UserProfileView/>}
    </div>
  );
}
