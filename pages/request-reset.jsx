import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkSession } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  async function handleforgotPassword(e) {
    e.preventDefault();
    if (email === '') {
      setError('please enter an email');
      return;
    }
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:3000/password-reset', //// this will redirect to us at password-reset page,
        //// you can also set your own page for it.
      }
    );
    if (error) {
      setError(error);
    }
    if (data) {
      setSuccess(`an email will be sent shortly to ${email} within 5 minutes`);
      setError(false);
    }
  }
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      router.push('/');
    }
  }, []);
  return (
    <form>
      <h1>Recovery Email</h1>
      {success && <span className="">{success}</span>}
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
      {error && <span className="form-error display-block">{error}</span>}

      <button className="button" onClick={(e) => handleforgotPassword(e)}>
        Reset Password
      </button>
    </form>
  );
}
