import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
export default function EmailSignUp() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [formError, setError] = useState(null);
  const handleChange = (props) => (event) => {
    let value = event.target.value;
    setForm({
      ...form,
      [props]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError('please complete the form');
      console.log(formError);
      return;
    }
    console.log(form);
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: form.email,
        password: form.password,
      },
      {
        data: {
          first_name: 'Chloe',
          age: 27,
        },
      }
    ); //session is returnedf only if email confirmation is off
    // console.log(res);
    if (error) {
      console.log(error);
    }
    if (user) {
      console.log(user);
    }
  };

  return (
    <div className="page create">
      {formError && <p>{formError}</p>}
      <form id="new-product-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">Create an Account</div>
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            autoComplete="username"
            placeholder="Enter your email"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          <span className="form-error">Please enter a valid email</span>
        </div>
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            placeholder="Enter a password"
            autoComplete="current-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
          <span className="form-error">Please enter a password</span>
        </div>
        <div id="button">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
