import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <Link href="/help">
            <a>Help Center</a>
          </Link>
        </li>
        <li>
          <Link href="/aboutUs">
            <a style={{ color: 'black' }}>© 2022 ZECC-W</a>
          </Link>
        </li>
        <li>
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
