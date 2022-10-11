import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  async function changePassword(e) {
    e.preventDefault();
    console.log('press');
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
      console.log(data);
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event != 'PASSWORD_RECOVERY') {
        console.log(event);
        console.log(session);
        // router.push('/');
      }
    });
  }, []);
  return (
    <form>
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
        {error && <span className="form-error display-block">{error}</span>}
        {success && <span>{success}</span>}
      </div>
      <button className="button" onClick={(e) => changePassword(e)}>
        Change Password
      </button>
    </form>
  );
}
