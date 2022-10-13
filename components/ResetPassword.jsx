import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  async function handleforgotPassword(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:3000/password-reset', //// this will redirect to us at password-reset page,
        //// you can also set your own page for it.
      }
    );
    if (error) {
      console.error(error);
    }
    // if (data) console.log(data); dont want any users to see this data
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt(
          'What would you like your new password to be?'
        );
        const { data, error } = await supabase.auth.update({
          password: newPassword,
        });

        if (data) alert('Password updated successfully!');
        if (error) alert('There was an error updating your password.');
      }
    });
  }, []);
  return (
    <form>
      <h1>Recovery Email</h1>
      <label htmlFor="email" className="form-label">
        Email
        <input
          className="form-input"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <button className="button" onClick={(e) => handleforgotPassword(e)}>
        Reset Password
      </button>
    </form>
  );
}
