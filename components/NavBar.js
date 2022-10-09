import Link from 'next/link';
import supabase from '../config/supabaseClient';
export default function NavBar() {
  return (
    <div className="row flex-center flex">
      <ul>
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
          <Link href="/user/profile">
            <a>profile</a>
          </Link>
        </li>
        <li>
          <Link href="/user/setting">
            <a>setting</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
