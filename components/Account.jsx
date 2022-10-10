import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import SignOut from './SignOut';
import { useSelector, useDispatch } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice';
import { useRouter } from 'next/router';
export default function Account() {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);
  const [error, setError] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!user.id) {
      dispatch(checkSession(router));
      console.log('no id');
    }
    setLoading(false);
    getProfile();
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);
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
        setFirstname(data.firstname || '');
        setLastname(data.lastname || '');
        setEmail(user.email);
        setId(data.id);
      }
    } catch (error) {
      console.log(error);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
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
            value={email}
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
            value={firstname}
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
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <span className="form-error">Please enter a last name</span>
        <div>
          <button className="button" onClick={updateProfile} disabled={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
        <div>
          <SignOut />
        </div>
      </form>
    </div>
  );
}
