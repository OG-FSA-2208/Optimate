import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
export default function RPCTest() {
  // const router = useRouter();
  const rpcfunction = async () => {
    const res = await supabase.rpc('testfunc');
    const { data, error } = await supabase.rpc('testfunc');
    console.log('rpc ');
    console.log(res);

    console.log(data);
    console.log(error);
  };
  return (
    <button className="button" onClick={rpcfunction}>
      test rpc
    </button>
  );
}
