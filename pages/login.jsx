import EmailSignIn from '../components/EmailSignIn';
import Link from 'next/link';
import OAuthBar from '../components/OAuthBar';
import Head from 'next/head';

function Login() {
  return (
    <div>
      <Head>
          <title>Optimate | Log in</title>
      </Head>
      <EmailSignIn />
    </div>
  );
}

export default Login;
