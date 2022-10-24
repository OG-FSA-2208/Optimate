import Footer from './Footer';
import NavBar from './NavBar';
import {burgerClickedExport} from './NavBar';
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="main" onClick={() => burgerClickedExport(false)}>{children}</main>
      <Footer />
    </>
  );
}
