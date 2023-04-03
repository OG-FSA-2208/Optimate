import EmailSignUp from '../components/EmailSignUp';
import Head from 'next/head';

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Optim8 | Signup</title>
      </Head>
      <EmailSignUp />
    </div>
  );
}
