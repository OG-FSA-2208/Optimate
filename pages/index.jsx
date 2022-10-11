import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from '../store/reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../config/supabaseClient';
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // let mounted = true;
    if (user.id) {
      router.push('/user/profile'); // when a user is logged in, this will sent them to their profile
    }
    console.log('hi');
    async function getInitialSession() {
      dispatch(checkSession());
      setIsLoading(false);
    }
    getInitialSession();
  }, [user]);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {isLoading ? (
        <>Not a booty call but a foodie call</>
      ) : (
        <div className="landing">
          {!user.id && (
            <div className="no-session">
              <h1 className="logo">Optimate</h1>
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
        </div>
      )}
    </div>
  );
}
