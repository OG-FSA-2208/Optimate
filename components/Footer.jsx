import Link from 'next/link';
import { motion } from 'framer-motion';

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
          <motion.h3
            whileHover={{
              scale: 1.3,
            }}
          >
            <Link href="/aboutUs">
              <a
                style={{ color: 'black' }}
                // style={{ color: 'rgba(250, 171, 171, 0.6)' }}
                // target="_blank"
                // href="https://github.com/OG-FSA-2208/Optimate"
              >
                © 2022 ZECC-W
              </a>
            </Link>
          </motion.h3>
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
