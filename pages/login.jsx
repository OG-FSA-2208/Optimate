import EmailSignIn from '../components/EmailSignIn';
import Link from 'next/link';
import OAuthBar from '../components/OAuthBar';
function Login() {
  return (
    <div>
      <EmailSignIn />
      <OAuthBar />
    </div>
  );
}

export default Login;
