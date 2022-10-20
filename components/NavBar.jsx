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

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [burgerClicked, setBurgerClicked] = useState(false);
  // checks if there is a user logged in
  const session = useSelector((state) => state.user.id);
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
  useEffect(() => {
    dispatch(checkSession());

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
          router.push('/password-reset');
        }
      }
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    dispatch(getMessages());
    const messageListener = dispatch(sub());
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
              <a>Optimate 🐙</a>
            </Link>
          ) : (
            <Link href="/">
              <a>Optimate 🐙</a>
            </Link>
          )}
        </motion.h2>
      </div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        {session ? (
          // these are the links that will appear if a user is logged in
          <>
            <li>
              <Link href="/messages">
                <a>
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
                <a>Account</a>
              </Link>
            </li>
            <li>
              <a onClick={() => dispatch(logoutUser(Router))}>
                <>Signout</>
              </a>
            </li>
          </>
        ) : (
          <>{/*TODO: gotta be a better way to do this than a ternary */}</>
        )}
      </ul>

      <div
        onClick={handleBurger}
        className={burgerClicked ? 'burger burger-toggle' : 'burger'}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
