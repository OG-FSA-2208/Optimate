import supabase from '../config/supabaseClient';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserMatches } from '../store/reducers/matchesSlice';
import { useRouter } from 'next/router';
export default function GetMatchesButton({ highlight, setHighlight }) {
  const [matchError, setMatchError] = useState('');
  const [matchSuccess, setSuccess] = useState(null);
  const [display, setDisplay] = useState('');
  // const [startTimer, setStartTimer] = useState(false);
  const [attemptMatch, setAttemptMatch] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const Ref = useRef(null);
  useEffect(() => {
    setDisplay('loading');
    async function getTimeToMatch() {
      const { data, error } = await supabase.rpc('time_to_match');
      if (data === '0') {
        setDisplay('now');
        setMatchError('');
      } else {
        let timeconst = data.split('.')[0].split(':');
        let totalSeconds =
          Number(timeconst[0]) * 3600 +
          Number(timeconst[1]) * 60 +
          Number(timeconst[2]) +
          1;
        let resetTime = new Date(Date.now() + totalSeconds * 1000);
        if (Ref.current) clearInterval(Ref.current);
        startCountDown(resetTime);
      }
    }
    getTimeToMatch();
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, [attemptMatch]);
  function startCountDown(resetTime) {
    const intervalId = setInterval(() => {
      if (resetTime > Date.now()) {
        secondsToTimestamp(resetTime);
      }
      if (Date.now() > resetTime) {
        clearInterval(Ref.current);
        setDisplay('now');
        setMatchError('');
      }
    }, 1000);
    Ref.current = intervalId;
  }
  function secondsToTimestamp(resetTime) {
    let secondsToReset = Math.floor((resetTime - Date.now()) / 1000);
    console.log(secondsToReset);
    let hours = Math.floor(secondsToReset / 3600);
    let min = Math.floor((secondsToReset % 3600) / 60);
    let seconds = secondsToReset - hours * 3600 - min * 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    setDisplay(`${hours}:${min}:${seconds}`);
  }
  const rpcAttemptFindMatch = async () => {
    const { data, error } = await supabase.rpc('find_match');
    if (data?.id) {
      setMatchError({});
      setSuccess('😏😏😏');
      dispatch(getAllUserMatches());
      setHighlight(data);
    }
    if (error) {
      setMatchError(error);
      const { data: data2, error: error2 } = await supabase
        .from('lastmatch')
        .upsert({ id: user.id });
      setAttemptMatch(attemptMatch + 1);
    }
  };
  return (
    <div className="getMatches">
      {matchSuccess && <span>{matchSuccess}</span>}
      <p>Get a new match daily</p>
      <p className="timer">{display}</p>
      <button
        className="button"
        onClick={rpcAttemptFindMatch}
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
