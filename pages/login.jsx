import EmailSignIn from '../components/EmailSignIn';
import Link from 'next/link';
function Login() {
  return (
    <div>
      Login
      <EmailSignIn />
      <Link href="/request-reset">
        <a>Forgot Password?</a>
      </Link>
    </div>
  );
}

export default Login;
