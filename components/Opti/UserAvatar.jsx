import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUser } from '../../store/reducers/profileSlice.js';

export default function BotAvatar() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);
  return profile.avatar_url ? (
    <div>{<img className="user-avatar-icon" src={profile.avatar_url} />}</div>
  ) : (
    <div>
      {
        <img
          className="user-avatar-icon"
          src={
            'https://www.tutorsvalley.com/public/storage/uploads/tutor/1574383712-1AB5217C-5A13-4888-A5A1-BE0BCADBC655.png'
          }
        />
      }
    </div>
  );
}
