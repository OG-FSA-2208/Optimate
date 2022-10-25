import Footer from './Footer';
import NavBar from './NavBar';
import {setBurgerClickedExport} from './NavBar';
console.dir(setBurgerClickedExport)
export default function Layout({ children }) {
  // this is handleBurger copied from NavBar except with setBurgerClickedExport
  // which is just setBurgerClicked from NavBar... but exported
  // not very graceful but it works to add/remove animation to links
  const handleBurger = () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    setBurgerClickedExport(false);

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
    <>
      <NavBar />
      {/* onclick on main makes sure that the burger menu will close when
      user clicks outside the menu  */}
      <main className="main" onClick={handleBurger}>{children}</main>
      <Footer />
    </>
  );
}
