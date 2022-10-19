import supabase from '../config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';

export default function GetMatchesButton({ highlight, setHighlight }) {
  // const router = useRouter();

  const [matchError, setMatchError] = useState({});
  const [matchSuccess, setSuccess] = useState(null);
  const [display, setDisplay] = useState('');
  const [startTimer, setStartTimer] = useState(false);
  const dispatch = useDispatch();
  let timer;
  useEffect(() => {
    async function getTimeToMatch() {
      const { data, error } = await supabase.rpc('time_to_match');
      if (data === '0') {
        timer = 0;
      } else {
        let timeconst = data.split('.')[0].split(':');
        let totalSeconds =
          Number(timeconst[0]) * 3600 +
          Number(timeconst[1]) * 60 +
          Number(timeconst[2]);
        timer = totalSeconds;
        setStartTimer(true);
      }
    }
    getTimeToMatch();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        timer--;
        secondsToTimestamp();
      }
      if (timer <= 0) {
        clearInterval(intervalId);
        setDisplay('now');
      }
    }, 1000);
  }, [startTimer]);
  function secondsToTimestamp() {
    let hours = Math.floor(timer / 3600);
    let min = Math.floor((timer % 3600) / 60);
    let seconds = timer - hours * 3600 - min * 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    setDisplay(`${hours}:${min}:${seconds}`);
    // return `${hours}:${min}:${seconds}`;
  }
  const rpcfunction = async () => {
    const { data, error } = await supabase.rpc('find_match');
    if (data?.id) {
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
      <p className="timer">{display}</p>
      <button
        className="button"
        onClick={rpcfunction}
        disabled={display !== 'now'}
      >
        Find Match
      </button>
      {matchError.details && (
        <span className="form-error display-block">{matchError.details}</span>
      )}
    </div>
  );
}
