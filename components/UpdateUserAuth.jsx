import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { checkSession } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
export default function UpdateUserAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({});
  const [formSuccess, setSuccess] = useState({});
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [authProvider, setProvider] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      console.log('hi', user);
      setEmail(user.email);
      const providers = user.app_metadata.providers;
      console.log(user);
      if (providers.length === 1 && providers[0] === 'email') {
        console.log(providers);
        setProvider(false);
      }
    }
  }, [user]);
  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    console.log('no');
    setSuccess({});
    setFormError({});
    if (!email) {
      setFormError({ email: 'please enter an email' });
      return;
    }
    const { user, error } = await supabase.auth.update({
      email: email,
    });
    if (error) {
      if ((error.status = 422)) {
        setFormError({
          email: 'please enter a valid email',
        });
      } else {
        setFormError({
          email:
            'there wasw an issue processing your request, please try again later',
        });
      }
      console.error('update', error);
    }
    if (user) {
      console.error(user);
      setSuccess({
        email: `A confirmation e-mail will be sent to your email at ${user.email} within 5minutes, and en email verification email will be sent to ${email}. Please validate your your e-mail by clicking on the enclosed links`,
      });
    }
  };
  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    setSuccess({});
    setFormError({});
    if (passwordConfirm !== password) {
      setFormError({ password: 'passwords do not match' });
      // return;
    }
    const { user, error } = await supabase.auth.update({
      password: password,
    });
    if (error) {
      if ((error.status = 422)) {
        setFormError({
          [error.status]: 'there was an issue processing your reuest',
        });
      }
      console.error(error);
    }
    if (user) {
      setSuccess({
        password: `A confirmation e-mail will be sent to your email at ${user.email} within 5minutes. Please validate your your e-mail by clicking on the enclosed link`,
      });
    }
  };

  return (
    <div className="form-container">
      <form id="update-userauth-form">
        <div className="form-title">Update Login information</div>
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            autoComplete="username"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={authProvider}
          />
        </div>{' '}
        {formError.email && (
          <span className="form-error display-block">{formError.email}</span>
        )}
        <div id={authProvider ? '' : 'button'}>
          <button disabled={authProvider} onClick={(e) => handleSubmitEmail(e)}>
            Change email address
          </button>
        </div>
        {formSuccess.email && (
          <span className="form-item form-success">{formSuccess.email}</span>
        )}
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            className="form-input"
            placeholder="Enter a password"
            autoComplete="new-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={passwordConfirm}
            onChange={(e) => setpasswordConfirm(e.target.value)}
          />
          {passwordConfirm !== password && (
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
          <button onClick={(e) => handleSubmitPassword(e)}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
