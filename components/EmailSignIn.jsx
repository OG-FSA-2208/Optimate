import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice';
import Link from 'next/link';
import OAuthBar from './OAuthBar';
export default function EmailSignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({});

  const handleChange = (props) => (event) => {
    let value = event.target.value;
    setForm({
      ...form,
      [props]: value,
    });
  };
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError({});
    if (!form.email) {
      setFormError({ ...formError, email: 'please enter an email address' });
      return;
    }
    if (!form.password) {
      setFormError({ ...formError, password: 'please enter your password' });
      return;
    }
    const { user, error } = await supabase.auth.signIn({
      email: form.email,
      password: form.password,
    });
    if (error) {
      console.error(error);
      setFormError({ status: error.status });
      return;
    }
    if (user) {
      console.log(user);
      setForm({
        email: '',
        password: '',
      });
      router.push('/');
    }
  };
  const user = useSelector((state) => state.user.id);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);
  return (
    <div className="form-container">
      <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">Login to Optimate</div>
        {formError.status === 400 && (
          <span className="form-error display-block">
            email and password combination is incorrect
          </span>
        )}
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            autoComplete="username"
            className="form-input"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          {formError.email && (
            <span className="form-error display-block">{formError.email}</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            placeholder="Enter your password"
            name="password"
            autoComplete="current-password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
          {formError.password && (
            <span className="form-error display-block">
              {formError.password}
            </span>
          )}
        </div>
        <div id="button">
          <button type="submit">Login</button>
        </div>
        <div>
          <h3>Or login with</h3>
          <OAuthBar />
        </div>
        <p
          className="link"
          onClick={() => {
            router.push('./signup');
          }}
        >
          No account? Sign up now!
        </p>
        <Link href="/request-reset">
          <a className="link">Forgot Password?</a>
        </Link>
      </form>
    </div>
  );
}
