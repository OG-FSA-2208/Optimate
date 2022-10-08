export default function SignOut() {
  return (
    <button className="button" onClick={() => supabase.auth.signOut()}>
      Sign Out
    </button>
  );
}
