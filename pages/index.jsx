import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Account from '../components/Account';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log(supabase.auth);
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
    // const { subscription } = supabase.auth.onAuthStateChange(
    //   (_event, session) => {
    //     setSession(session);
    //   }
    // );
    // return () => {
    //   mounted = false;
    //   subscription?.unsubscribe();
    // };
  }, []);
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <p>please sign in</p>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
