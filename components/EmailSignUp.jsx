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
        <h2 className="newproducttitle">New Product Form</h2>
        <div className="form-line">
          <label>
            email
            <input
              className="newproductform"
              autoComplete="username"
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
              autoComplete="current-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
            />
          </label>
        </div>
        <button className="newproductbtn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
