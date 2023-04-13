import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from '../store/reducers/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getInitialSession() {
      dispatch(checkSession());
      setIsLoading(false);
    }
    if (user.id) {
      router.push('/user/profile'); // when a user is logged in, this will sent them to their profile
    } else {
      getInitialSession();
    }
  }, [user]);

  return (
    <div className="container">
      <Head>
        <title>
          Optim8 - Find Love with who you want from your daily match
        </title>
        <meta
          name="description"
          content="We have created a site where you will only find lvoe interests among matches that you actually want to see."
          key="desc"
        />
        <meta
          property="og:title"
          content="Optim8 - Find Love with who you want from your daily match"
        />
        <meta
          property="og:description"
          content="We have created a site where you will only find lvoe interests among matches that you actually want to see."
        />
        <meta property="og:image" content="🐙" />
      </Head>

      {isLoading ? (
        <>Not a booty call but a foodie call</>
      ) : (
        <div className="landing">
          {!user.id && (
            <div className="no-session">
              <motion.h1
                className="logo"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.8,
                    },
                  },
                }}
              >
                Optim8
              </motion.h1>
              {/* <h1 className="logo">Optim8</h1> */}
              <div>
                <h4>Returning User?</h4>
                <button
                  onClick={() => {
                    router.push('./login');
                  }}
                >
                  Login
                </button>
              </div>
              <div>
                <h4>First time here?</h4>
                <button
                  onClick={() => {
                    router.push('./signup');
                  }}
                >
                  Register Now
                </button>
              </div>
              <p>
                <br></br>
                <br></br>
                <br></br>
                <i>
                  <small>
                    <small>Not a booty call but a foodie call </small>{' '}
                  </small>
                </i>
                😉
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
