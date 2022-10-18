import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { useEffect } from 'react';
export default function RPCTest() {
  // const router = useRouter();
  useEffect(() => {
    async function timer() {
      const { data, error } = await supabase.rpc('time_to_match');
    }
  });
  const rpcfunction = async () => {
    // const res = await supabase.rpc('testfunc');
    const { data, error } = await supabase.rpc('new_match');
    // console.log(res);
    // console.log(res.data)
    console.log(data);
    console.log(error);
  };
  return (
    <div>
      <p className="timer">{}</p>
      <button className="button" onClick={rpcfunction}>
        find match
      </button>
    </div>
  );
}
