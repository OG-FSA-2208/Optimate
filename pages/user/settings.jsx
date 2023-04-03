import Link from 'next/link';
import UpdateUserAuth from '../../components/UpdateUserAuth';
import Head from 'next/head';

export default function Setting() {
  return (
    <>
      <Head>
        <title>Optim8 | Settings</title>
      </Head>
      <UpdateUserAuth />
    </>
  );
}
