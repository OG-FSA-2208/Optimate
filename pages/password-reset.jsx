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
    const { data, error } = await supabase.auth.update({
      password: password,
    });

    if (error) {
      console.log(error);
    }
    if (data) console.log(data);
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('recovery?');
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt(
          'What would you like your new password to be?'
        );

        if (data) alert('Password updated successfully!');
        if (error) alert('There was an error updating your password.');
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
          value={form.passwordConfirm}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <span className="form-error">{error}</span>}
      </div>

      <button className="button" onClick={(e) => changePassword(e)}>
        Change Password
      </button>
    </form>
  );
}
