import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import SignOut from './SignOut';
import { useSelector } from 'react-redux';
export default function Account() {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [id, setId] = useState(null);
  const session = useSelector((state) => state.user);
  useEffect(() => {
    console.log('effect');
    console.log(session);
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
    <>
      {session.user && (
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
            <button
              className="button primary block"
              onClick={() => updateProfile({ firstname, lastname })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>

          <div>
            <SignOut />
          </div>
        </div>
      )}
    </>
  );
}
