import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { logoutUser } from '../store/reducers/userSlice';
import { useEffect, useState } from 'react';
export default function RPCTest() {
  // const router = useRouter();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    async function timer() {
      const { data, error } = await supabase.rpc('time_to_match');
      console.log('res');
      console.log(data);
      if (data === '0') setTimer(0);
      else {
        let timeconst = data.split('.')[0].split(':');
        let totalSeconds =
          Number(timeconst[0]) * 3600 +
          Number(timeconst[1]) * 60 +
          Number(timeconst[2]);
        setTimer(totalSeconds);
      }
    }
    timer();
  }, []);
  const rpcfunction = async () => {
    // const res = await supabase.rpc('testfunc');
    const { data, error } = await supabase.rpc('find_match');
    // console.log(res);
    // console.log(res.data)
    console.log(data);
    console.log(error);
  };
  return (
    <div>
      <p className="timer">{}</p>
      <button className="button" onClick={rpcfunction}>
        Find Match {timer == 0 ? 'now' : `in ${timer} seconds`}
      </button>
    </div>
  );
}
