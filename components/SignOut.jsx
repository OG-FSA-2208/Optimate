import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
export default function SignOut() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(router));
  };
  return (
    <button className="button" onClick={handleLogout}>
      Sign Out
    </button>
  );
}
