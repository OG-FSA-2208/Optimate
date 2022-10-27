import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession, logoutUser } from '../store/reducers/userSlice.js';
import { useRouter } from 'next/router';
import supabase from '../config/supabaseClient.js';
import { sub, unsub, getMessages } from '../store/reducers/messengerSlice';
import { motion } from 'framer-motion';
import { Badge } from '@mui/material';
let setBurgerClickedExport;

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [burgerClicked, setBurgerClicked] = useState(false);
  setBurgerClickedExport = setBurgerClicked;

  // checks if there is a user logged in
  const session = useSelector((state) => state.user?.id);
  const numUnread = useSelector(
    (state) =>
      state.messenger.messages.filter(
        (message) => message.read === false && message.to === state.user.id
      ).length || 0
  );

  const handleBurger = () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    setBurgerClicked(!burgerClicked);

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.8
        }s`;
      }
    });
  };

  const handleRedirect = () => {
    setBurgerClicked(false);
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach((link, index) => (link.style.animation = ''));
  };

  useEffect(() => {
    dispatch(checkSession());
    if (router.asPath.startsWith('/#access_token') & (router.route === '/')) {
      if (router.asPath.endsWith('type=recovery')) {
        router.push('/password-reset');
      } else {
        router.push('/user/profile');
      }
    }
    const { subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event == 'SIGNED_IN') {
          // dispatch(checkSession(router));
        }
        if (event == 'SIGNED_OUT') {
        }
        if (event == 'USER_UPDATED') {
        }
        if (event == 'PASSWORD_RECOVERY') {
          router.push(`${process.env.URL}/password-reset`);
        }
      }
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // listens to see if the user is logged in or not
  useEffect(() => {
    dispatch(getMessages());
    const messageListener = dispatch(sub());
    if (session) {
      document.body.classList.add('altBg');
      document.body.classList.remove('login');
    } else {
      document.body.classList.add('login');
      document.body.classList.remove('altBg');
    }

    return () => {
      messageListener && unsub(messageListener);
    };
  }, [session]);

  return (
    <nav className="navbar">
      <div className="brand-title">
        <motion.h2
          whileHover={{
            scale: 1.3,
          }}
        >
          {session ? (
            <Link href="/user/homepage">
              <a className="OptimateWithBurger" onClick={handleRedirect}>
                Optimate 🐙
              </a>
            </Link>
          ) : (
            <Link href="/">
              <a className="Optimate">Optimate 🐙</a>
            </Link>
          )}
        </motion.h2>
      </div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        {session && (
          // these are the links that will appear if a user is logged in
          <>
            <li>
              <Link href="/messages">
                <a onClick={handleRedirect}>
                  Messages
                  <Badge
                    color="primary"
                    badgeContent={numUnread}
                    max={99}
                    style={{ transform: 'translate(0,-10px)' }}
                  ></Badge>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user/profile">
                <a onClick={handleRedirect}>Account</a>
              </Link>
            </li>
            <li>
              <a
                onClick={() => {
                  dispatch(logoutUser(Router));
                  handleRedirect();
                }}
              >
                <>Signout</>
              </a>
            </li>
          </>
        )}
      </ul>

      {session && (
        <div
          onClick={handleBurger}
          className={
            burgerClicked && session ? 'burger burger-toggle' : 'burger'
          }
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      )}
    </nav>
  );
}

export { setBurgerClickedExport };
