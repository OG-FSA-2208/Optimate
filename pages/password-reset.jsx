import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  async function changePassword(e) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('please complete all fields and resubmit');
      return;
    }
    if (password !== confirmPassword) {
      setError('password does not match, please reenter a new password');
      return;
    }
    const { data, error } = await supabase.auth.update({
      password: password,
    });
    if (error) {
      setError('There was an error updating your password.');
    }
    if (data) {
      setError(false);
      setSuccess(`your password has been changed successfully`);
    }
  }

  return (
    <div className="form-container">
      <form id="change-password-form">
        <Head>
          <title className="form-title">Optim8 | Password Reset</title>
        </Head>
        <h1>please enter a new password</h1>
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          {error && <p className="form-error display-block">{error}</p>}
          {success && (
            <>
              <p>{success}</p>
              <Link href="/user/homepage">
                <a>return to home</a>
              </Link>
            </>
          )}
        </div>
        <button className="button" onClick={(e) => changePassword(e)}>
          Change Password
        </button>
      </form>
    </div>
  );
}
