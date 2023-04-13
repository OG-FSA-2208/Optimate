import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  async function handleforgotPassword(e) {
    e.preventDefault();
    if (email === '') {
      setFormError('please enter an email');
      return;
    }
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${process.env.URL}/password-reset`,
      }
    );
    if (error) {
      setFormError('there was an error processing your request');
    }
    if (data) {
      setSuccess(`an email will be sent shortly to ${email} within 5 minutes`);
      setFormError(false);
    }
  }
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      router.push('/');
    }
  }, []);
  return (
    <div className="form-container">
      <form id="request-reset-form">
        <Head>
          <title>Optim8 | Password Reset</title>
        </Head>
        <h1>Recovery Email</h1>
        {success && <span className="">{success}</span>}

        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {formError && (
          <span className="form-error display-block">{formError}</span>
        )}
        <button className="button" onClick={(e) => handleforgotPassword(e)}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
