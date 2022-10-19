import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { checkSession } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaGithub, FaFacebook, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function UpdateUserAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({});
  const [formSuccess, setSuccess] = useState({});
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [authProvider, setAuthProvider] = useState(false);
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo.id) {
      console.log('hi', userInfo);
      setEmail(userInfo.email);
      const providers = userInfo.app_metadata.providers;
      console.log(userInfo);
      if (providers.length === 1 && providers[0] === 'email') {
        setAuthProvider(false);
      } else {
        setAuthProvider(providers);
        console.log(authProvider);
      }
    }
  }, [userInfo]);
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
            'there was an issue processing your request, please try again later',
        });
      }
      console.error('update', error);
    }
    if (user) {
      console.error(user);
      setSuccess({
        email: `A confirmation e-mail will be sent to your email at ${userInfo.email} within 5minutes, and en email verification email will be sent to ${email}. Please validate your your e-mail by clicking on the enclosed links`,
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
      // email: userInfo.email,
      password: password,
    });
    console.log('res', user, error);
    if (error) {
      setFormError({
        password: error.message,
      });
    }
    if (user) {
      console.log('changed');
      setSuccess({
        password: `your password has been successfully changed`,
      });
    }
  };

  return (
    <div className="form-container">
      <form id="update-userauth-form">
        <button>
          <Link href="/user/profile">Return to Profile</Link>
        </button>
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
        <div className="button">
          <button disabled={authProvider} onClick={(e) => handleSubmitEmail(e)}>
            Change email address
          </button>
        </div>
        {formSuccess.email && (
          <span className="form-item form-success">{formSuccess.email}</span>
        )}
        {authProvider && (
          <>
            <span className="form-error display-block">
              email cannot be updated because you are connected to
            </span>
            <span>
              {authProvider.includes('google') && <FaGoogle />}
              {authProvider.includes('facebook') && <FaFacebook />}
              {authProvider.includes('github') && <FaGithub />}
            </span>
          </>
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
        </div>{' '}
        {passwordConfirm !== password && (
          <span className="form-error display-block">
            Passwords does not match
          </span>
        )}
        {formError.password && (
          <span className="form-error display-block">{formError.password}</span>
        )}
        <div className="button">
          <button onClick={(e) => handleSubmitPassword(e)}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
