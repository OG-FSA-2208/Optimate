import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
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
      <form>
        <div className="form-title">Update Profile</div>
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="text"
            value={session.user.email}
            disabled
          />
          <span className="form-error">Please enter an email</span>
        </div>
        <div className="form-item">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            className="form-input form-input-small"
            id="firstname"
            type="text"
            value={firstname || ''}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <span className="form-error">Please enter a first name</span>
        </div>
        <div className="form-item">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            className="form-input form-input-small"
            id="lastname"
            type="text"
            value={lastname || ''}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <span className="form-error">Please enter a last name</span>
        <div>
          <button
            className="button"
            onClick={() => updateProfile({ firstname, lastname })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
        <div>
          <button className="button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
}
