import { useDispatch } from 'react-redux';
import { providerOAuth } from '../store/reducers/userSlice';
import { FaGithub, FaFacebook, FaGoogle } from 'react-icons/fa';

export default function OAuthBar() {
  const dispatch = useDispatch();
  function AttemptProviderOAuth(e) {
    dispatch(providerOAuth(e.target.value));
  }
  return (
    <div className="auth-buttons">
      <button value="google" onClick={(e) => AttemptProviderOAuth(e)}>
        <FaGoogle />
      </button>
      <button value="facebook" onClick={(e) => AttemptProviderOAuth(e)}>
        <FaFacebook />
      </button>
      <button value="github" onClick={(e) => AttemptProviderOAuth(e)}>
        <FaGithub />
      </button>
    </div>
  );
}
