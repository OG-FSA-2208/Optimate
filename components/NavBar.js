import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [burgerClicked, setBurgerClicked] = useState(false);

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
        <li>
          <Link href="/post">
            <a>posts</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>user profile</a>
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
