import { useDispatch } from 'react-redux';
import { providerOAuth } from '../store/reducers/userSlice';
import { FaGithub, FaFacebook, FaGoogle } from 'react-icons/fa';

export default function OAuthBar() {
  const dispatch = useDispatch();
  function AttemptProviderOAuth(e, provider) {
    e.preventDefault();
    dispatch(providerOAuth(provider));
  }
  return (
    <div className="auth-buttons">
      <button value="google" onClick={(e) => AttemptProviderOAuth(e, 'google')}>
        <FaGoogle />
      </button>
      <button
        value="facebook"
        onClick={(e) => AttemptProviderOAuth(e, 'facebook')}
      >
        <FaFacebook />
      </button>
      <button value="github" onClick={(e) => AttemptProviderOAuth(e, 'github')}>
        <FaGithub />
      </button>
    </div>
  );
}
