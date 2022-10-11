import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice.js';
import Router from 'next/router';

export default function NavBar() {
  const dispatch = useDispatch();
  const [burgerClicked, setBurgerClicked] = useState(false);
  // checks if there is a user logged in
  const session = useSelector((state) => state.user.id);

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
    dispatch(checkSession(Router));
  }, [session]);

  return (
    <nav className="navbar">
      <div className="brand-title">
        Optimate -- Not a booty call but a foodie call 😉
      </div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        {session ? (
          // these are the links that will appear if a user is logged in
          <>
            <li>
              <Link href="/user/homepage">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/user/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/user/preferences">
                <a>Preferences</a>
              </Link>
            </li>
            <li>
              <Link href="/user/setting">
                <a>Setting</a>
              </Link>
            </li>
            <li>
              <Link href="/user/help">
                <a>Help Center</a>
              </Link>
            </li>
            <li>
              <Link href="/messages">
                <a>Messages</a>
              </Link>
            </li>
          </>
        ) : (
          // these are the links that will appear if a user is not logged in
          <>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </li>
          </>
        )}
      </ul>

      <div
        onClick={handleBurger}
        className={burgerClicked ? 'burger toggle' : 'burger'}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
