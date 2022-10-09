import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import Account from '../components/Account';
import EmailSignUp from '../components/EmailSignUp';
import { useRouter } from 'next/router';
import { checkSession } from '../store/reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // const [session, setSession] = useState(null);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(supabase.auth);
    let mounted = true;

    async function getInitialSession() {
      console.log('getinit');
      dispatch(checkSession());
      setIsLoading(false);
    }
    getInitialSession();
    if (user.id) {
      router.push('/user/profile');
    }
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
      {isLoading ? (
        <></>
      ) : (
        <>
          {!user.id && (
            <div className="no-session">
              <div>
                <h3>Returning User?</h3>
                <button
                  onClick={() => {
                    router.push('./login');
                  }}
                >
                  Login
                </button>
              </div>
              <div>
                <h3>First time here?</h3>
                <button
                  onClick={() => {
                    router.push('./signup');
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          )}
          {/* {!session ? (
            <EmailSignUp />
          ) : (
            <Account key={session.id} session={session} />
          )} */}
        </>
      )}
    </div>
  );
}
