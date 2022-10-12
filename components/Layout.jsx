import Footer from './Footer';
import NavBar from './NavBar';
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
