import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

// Account is the user's credentials
export default function UserProfile({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [about, setAbout] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getCurrentUser() {
    if (!session) {
      throw new Error('User not logged in');
    }
    const user = supabase.auth.user();
    return user;
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      console.log(user);
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAbout(data.about);
        setAge(data.age);
        setGender(data.gender);
        setId(data.id);
      }
    } catch (error) {
      console.log(error);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        firstname,
        lastname,
        about,
        age,
        gender
      };
      let { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id);
      if (error) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      getProfile();
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="firstname">first name</label>
        <input
          id="firstname"
          type="text"
          value={firstname || ''}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">last name</label>
        <input
          id="lastname"
          type="text"
          value={lastname || ''}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="about">profile bio</label>
        <input
          id="about"
          type="text"
          value={about || ''}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="age">age</label>
        <input
          id="age"
          type="text"
          value={age || ''}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">gender</label>
        <select value={gender || 'unselected'} onChange={(e) => setGender(e.target.value)}>
          <option disabled value='unselected'>Select</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='nb'>Non-binary</option>
          <option value='other'>Other</option>
        </select>
        {/* <input
          id="gender"
          type="text"
          value={age || ''}
          onChange={(e) => setAge(e.target.value)}
        /> */}
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ firstname, lastname })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
