import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
export default function EmailSignIn() {
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
    const { user, error } = await supabase.auth.signIn({
      email: form.email,
      password: form.password,
    });
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
        <div className="form-title">Sign Up</div>
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            autoComplete="username"
            className="form-input"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          <span className="form-error">Please enter your username</span>
        </div>
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            placeholder="password"
            name="password"
            autoComplete="current-password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
          <span className="form-error">Please enter your password</span>
        </div>
        <div id="button">
          <button className="newproductbtn" type="submit">
            Login Now
          </button>
        </div>
      </form>
    </div>
  );
}
