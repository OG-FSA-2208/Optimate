import Link from 'next/link';
import supabase from '../config/supabaseClient';
import { useState } from 'react';
export default function NavBar() {
  const [burgerClicked, setBurgerClicked] = useState(false);
  
  const getSession = async () => {
    return await supabase.auth.session();
  }
  const session = getSession()

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

  return (
    <nav className="navbar">
      <div className="brand-title">Optimate</div>
      <ul className={burgerClicked ? 'nav-links nav-active' : 'nav-links'}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {session ? null : 
        <><li>
          <Link href="/login">
            <a>login</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>signup</a>
          </Link>
        </li></>}
        <li>
          <Link href="/post">
            <a>posts</a>
          </Link>
        </li>{' '}
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
