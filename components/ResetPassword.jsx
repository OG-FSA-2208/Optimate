import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function SignOut() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  async function handleforgotPassword(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) {
      console.log(error);
    }
    if (data) console.log(data);
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
          onChange={(e) => setEmail(e.target.email)}
        />
      </label>

      <button className="button" onClick={(e) => handleLogout(e)}>
        Reset Password
      </button>
    </form>
  );
}
