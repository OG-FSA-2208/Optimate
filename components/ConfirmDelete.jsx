import React, { useState, useEffect } from 'react';
import { deleteUser } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Router from 'next/router';

export default function ConfirmDelete({
  toggleConfirmDelete,
  setToggleConfirmDelete,
}) {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const userEmail = useSelector((state) => state.user.email);

  const handleDelete = (e) => {
    e.preventDefault();
    if (deleteConfirm === userEmail) {
      setFormError(null);
      // deletes the user, their related information, and the immediately logs out
      dispatch(deleteUser(Router));
    } else {
      setFormError('email is incorrect');
    }
  };

  return (
    <div className="form-container">
      <form id="delete-user-form">
        <div className="form-title">
          Are you sure you want to delete your Account?
        </div>
        <div className="form-item">
          <label htmlFor="deleteConfirm" className="form-label">
            please confirm your email
          </label>
          <input
            className={'form-input'}
            placeholder="Confirm your email"
            name="deleteConfirm"
            type="text"
            value={deleteConfirm}
            onChange={(e) => {
              setDeleteConfirm(e.target.value);
              setFormError('');
            }}
          />
        </div>
        {formError && (
          <span className="form-error display-block">{formError}</span>
        )}
        <button onClick={(e) => handleDelete(e)}>Delete Your Account</button>
        <button onClick={() => setToggleConfirmDelete(false)}>Cancel</button>
      </form>
    </div>
  );
}
