import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <Link href="/user/help">
            <a>Help Center</a>
          </Link>
        </li>
        <li>
          <a
            style={{ color: 'black' }}
            target="_blank"
            href="https://github.com/OG-FSA-2208/Optimate"
          >
            © 2022 ZECC-W
          </a>
        </li>
        {/* <li>© 2022 ZECC-W</li> */}
        <li>
          <Link href="/user/faq">
            <a>FAQ</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
