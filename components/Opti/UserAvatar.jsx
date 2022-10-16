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
  return (
    <div>{<img className="user-avatar-icon" src={profile.avatar_url} />}</div>
  );
}
