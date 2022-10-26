import supabase from '../../config/supabaseClient';
import UserProfile from '../../components/UserProfile';
import Head from 'next/head';

export default function Profile() {
  //TODO: add loading with next fallback?
  return (
    <div>
      <Head>
        <title>Optimate | Profile</title>
      </Head>
      {!supabase.auth.session() ? 'please sign in' : <UserProfile />}
    </div>
  );
}
