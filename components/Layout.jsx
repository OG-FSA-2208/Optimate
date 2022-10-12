import Footer from './Footer';
import NavBar from './NavBar';
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
