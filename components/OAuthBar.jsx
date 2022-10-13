import { useDispatch } from 'react-redux';
import { providerOAuth } from '../store/reducers/userSlice';

export default function OAuthBar() {
  const dispatch = useDispatch();
  function AttemptProviderOAuth(e) {
    dispatch(providerOAuth(e.target.value));
  }
  return (
    <div className="auth-buttons">
      <button value="google" onClick={(e) => AttemptProviderOAuth(e)}>
        google
      </button>
      <button value="facebook" onClick={(e) => AttemptProviderOAuth(e)}>
        facebook
      </button>
      <button value="github" onClick={(e) => AttemptProviderOAuth(e)}>
        github
      </button>
    </div>
  );
}
