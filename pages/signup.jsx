import EmailSignUp from '../components/EmailSignUp';
import Head from 'next/head';

export default function Signup() {
  return (
    <div>
      <Head>
          <title>Optimate | Signup</title>
      </Head>
      <EmailSignUp />
    </div>
  );
}
