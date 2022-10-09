import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice';
export default function EmailSignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [formError, setError] = useState(null);
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
      console.log('err', error);
    }
    if (user) {
      console.log(user);
      dispatch(checkSession());
      router.push('/user/profile');
    }
  };

  return (
    <form id="new-product-form" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="newproducttitle">Sign in Form</h2>
      {formError && <p>{formError}</p>}
      <div className="form-line">
        <label>
          email
          <input
            autoComplete="username"
            className="newproductform"
            placeholder="email"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </label>
      </div>
      <div className="form-line">
        <label>
          password
          <input
            className="newproductform"
            placeholder="password"
            name="password"
            autoComplete="current-password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
        </label>
      </div>
      <button className="login" type="submit">
        Login Now
      </button>
    </form>
  );
}
