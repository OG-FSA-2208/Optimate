import EmailSignUp from '../../components/EmailSignIn';
import { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';
import UserProfile from '../../components/UserProfile';
import Head from 'next/head';

export default function Profile() {
  // state/useEffect copy pasted from index.jsx, can probably refactor repeat code later on
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      setIsLoading(true);
      const session = await supabase.auth.session();
      if (session) {
        setSession(session);
        setIsLoading(false);
      }
    }
    getInitialSession();
  }, []);

  return (
    <div>
      <Head>
          <title>Optimate | Profile</title>
      </Head>
      {!session ? (
        'please sign in'
      ) : (
        <UserProfile key={session.user.id} session={session} />
      )}
    </div>
  );
}
