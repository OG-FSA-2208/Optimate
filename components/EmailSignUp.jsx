import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { checkSession } from '../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
export default function EmailSignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (dispatch(checkSession()) === true) {
      router.push('/');
    }
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setSuccess] = useState(null);
  const [passwordConfirm, setpasswordConfirm] = useState(false);

  const handleChange = (props) => (event) => {
    let value = event.target.value;
    setForm({
      ...form,
      [props]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setpasswordConfirm(false);
    setFormError(false);
    if (!form.email || !form.password) {
      setFormError('incomplete');
      return;
    }
    if (form.passwordConfirm !== form.password) {
      setpasswordConfirm(true);
      return;
    }
    const { user, error } = await supabase.auth.signUp(
      {
        email: form.email,
        password: form.password,
      }
      // {
      //   data: {
      //     first_name: 'metaname',
      //     age: 28,
      //   },
      // }
    );
    if (error) {
      setFormError(error.status);
      console.error(error);
      // const badEmail = {message: "Unable to validate email address: invalid format",status:422}
    }
    if (user) {
      setSuccess(
        `A confirmation e-mail will be sent to your email at ${user.email} within 5minutes. Please validate your your e-mail by clicking on the enclosed link`
      );
    }
  };

  return (
    <div className="form-container">
      {formError && <p>{formError}</p>}
      <form id="new-product-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">Create an Account</div>
        {formSuccess && (
          <span className="form-item form-success">{formSuccess}</span>
        )}
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            autoComplete="username"
            placeholder="Enter your email"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          {formError == 422 && (
            <span className="form-error display-block">
              Please enter a valid email
            </span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            placeholder="Enter a password"
            autoComplete="new-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
          <span className="form-error">Please enter a password</span>
        </div>
        <div className="form-item">
          <label htmlFor="passwordConfirm" className="form-label">
            Confirm Your Password
          </label>
          <input
            className={'form-input'}
            placeholder="Confirm your password"
            autoComplete="new-password"
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange('passwordConfirm')}
          />
          {passwordConfirm && (
            <span className="form-error display-block">
              Passwords does not match
            </span>
          )}
          <span className="form-error">Please enter a password</span>
        </div>
        <span
          className={
            formError === 'incomplete'
              ? 'form-error display-block'
              : 'form-error'
          }
        >
          Please complete the form
        </span>
        <div id="button">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
