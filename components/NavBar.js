import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../store/reducers/userSlice.js';
import Router from 'next/router';

export default function NavBar() {
  const dispatch = useDispatch();
  const [burgerClicked, setBurgerClicked] = useState(false);
  const session = useSelector(state => state.profile.id);

  console.dir(session)

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
  }, [])

  return (
    <nav className="navbar">
      <div className="brand-title">Optimate</div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {session ? 
        <>
          <li>
            <Link href="/user/profile">
              <a>profile</a>
            </Link>
          </li>
          <li>
            <Link href="/user/setting">
              <a>setting</a>
            </Link>
          </li>
          <li>
            <Link href="/user/homepage">
              <a>homepage</a>
            </Link>
          </li>
        </>
        : 
        <>
          <li>
            <Link href="/login">
              <a>login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>signup</a>
            </Link>
          </li>
        </>}
        <li>
          <Link href="/post">
            <a>posts (do we keep this??)</a>
          </Link>
        </li>
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
