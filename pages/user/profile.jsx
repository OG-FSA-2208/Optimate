import supabase from '../../config/supabaseClient';
import UserProfile from '../../components/UserProfile';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
  }, [])

  //TODO: add loading with next fallback?
  return (
    <div>
      <Head>
        <title>Optimate | Profile</title>
      </Head>
      {!session ? 'please sign in' : <UserProfile />}
    </div>
  );
}
