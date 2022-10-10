import Layout from '../components/Layout';
import "..//styles/globals.css";
import {useEffect, useState} from 'react';
import supabase from '../config/supabaseClient';

function MyApp({ Component, pageProps }) {
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
  }, []);

  return (
    <Layout session={session}>
      <Component {...pageProps} session={session}/>
    </Layout>
  );
}

export default MyApp;
