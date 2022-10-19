import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';

export default function GetMatchesButton({ highlight, setHighlight }) {
  // const router = useRouter();
  const [timer, setTimer] = useState(0);
  const [matchError, setMatchError] = useState({});
  const [matchSuccess, setSuccess] = useState(null);
  const dispatch = useDispatch();

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
    if (data.id) {
      setMatchError({});
      setSuccess('😏😏😏');
      dispatch(getAllUserMatches());
      setHighlight(data);
    }
    if (error) {
      setMatchError(error);
    }
  };
  return (
    <div id="getMatches">
      {matchSuccess && <span>{matchSuccess}</span>}
      <p>Get a new match daily</p>
      <p className="timer">{timer == 0 ? 'now' : `in ${timer} seconds`}</p>
      <p>(resets at midnight)</p>
      <button className="button" onClick={rpcfunction}>
        Find Match
      </button>
      {matchError.details && (
        <span className="form-error display-block">{matchError.details}</span>
      )}
    </div>
  );
}
