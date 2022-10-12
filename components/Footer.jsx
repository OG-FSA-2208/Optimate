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
        <li>© 2022 ZECC-W</li>
        <li>
          <a target="_blank" href="https://github.com/OG-FSA-2208/Optimate">
            Github
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
