import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PushPinIcon from '@mui/icons-material/PushPin';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import supabase from '../../config/supabaseClient';
import GetMatchesButton from '../../components/GetMatchesButton';

export default function Profile() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const profile = useSelector((state) => state.profile);
  const [pushPin, setPushPin] = useState({});
  const [highlight, setHighlight] = useState({});
  const [highlightPics, setHighlightPics] = useState([]);

  //initial render
  useEffect(() => {
    dispatch(getAllUserMatches());
    dispatch(getLoggedInUser());
  }, []);

  //useState beats useSelector in race, so setting it initially to profile would leave it as an empty object on refresh
  useEffect(() => {
    setHighlight(profile);
  }, [profile]);

  useEffect(() => {
    if (
      highlight.avatar_url === profile.avatar_url ||
      matches.some((match) => highlight.avatar_url === match.avatar_url)
    )
      setHighlightPics([highlight.avatar_url, ...highlight.user_photos]);
  }, [highlight]);

  //when matches var changes
  useEffect(() => {
    let mypins = {};
    matches.map((match) => {
      if (match.match.pinned === true) {
        mypins[match.id] = 'pinned';
        return;
      }
      if (match.match.pin1 === true) {
        if (match.id === match.match.id) {
          mypins[match.id] = 'theypinned';
        } else {
          mypins[match.id] = 'ipinned';
        }
        return;
      }
      if (match.match.pin2 === true) {
        if (match.id === match.match.id2) {
          mypins[match.id] = 'theypinned';
        } else {
          mypins[match.id] = 'ipinned';
        }
        return;
      }
    });
    setPushPin(mypins);
  }, [matches]);

  //functions
  //change higlighted picture
  function handlePic(num) {
    //get current pic index or true if avatar
    const index = highlightPics.indexOf(highlight.avatar_url);
    //if available, change to new pic
    if (num === -1) {
      if (!index) return; //do nothing if trying to move left from main pic
      setHighlight({
        ...highlight,
        avatar_url: highlightPics[index - 1],
      });
    } else {
      if (index === highlightPics.length - 1) return; //do nothing if trying to move right from end of array
      setHighlight({
        ...highlight,
        avatar_url: highlightPics[index + 1],
      });
    }
  }

  async function punchTheDamnedPin(match) {
    let query = supabase.from('matches2');
    if (profile.id === match.match.id) {
      query = query
        .update({ pin1: !match.match.pin1 })
        .match({ id: profile.id, id2: match.id });
    } else if (profile.id === match.match.id2) {
      query = query
        .update({ pin2: !match.match.pin2 })
        .match({ id: match.id, id2: profile.id });
    }
    const { data, error } = await query;
    if (data) {
      dispatch(getAllUserMatches());
    }
  }

  return (
    <div>
      <Head>
        <title>Optimate</title>
      </Head>
      {highlight.id ? (
        <div id="homepage-container">
          <div className="arrows-box">
            <ChevronLeft fontSize="large" onClick={() => handlePic(-1)} />
            <Link
              href={
                highlight.id === profile.id
                  ? '/user/profile'
                  : `/messages/${highlight.id}`
              }
            >
              <motion.div
                className="myProfile"
                key={highlight.id}
                whileHover={{
                  scale: 1.2,
                }}
                drag="x"
                dragConstraints={{
                  right: 18,
                  left: 0,
                }}
                whileTap={{
                  scale: 0.9,
                }}
              >
                <div>
                  <p>
                    {highlight.id === profile.id
                      ? 'Edit My Profile'
                      : 'Message'}
                  </p>
                  <h2>
                    {highlight.firstname} {highlight.lastname}
                  </h2>
                  <br></br>
                  <img
                    src={highlight.avatar_url}
                    className="profilePic"
                    onDrag={handlePic}
                  />
                </div>
                <div>
                  <p className="highlight">
                    <strong>Highlight: {highlight.highlight}</strong>
                  </p>
                  <br />
                  <p>Age: {highlight.age}</p>
                  <p>Gender: {highlight.gender}</p>
                  <p>About: {highlight.about}</p>
                  <p>Occupation: {highlight.occupation}</p>
                  <p>Status: {highlight.status}</p>
                  <p>Location: {highlight.location}</p>
                  <p style={{ fontSize: '1em' }}>
                    {highlight.drinker ? 'Drinker: 🍻' : null}{' '}
                    {highlight.smoker ? 'Smoker: 🚬' : null}
                  </p>
                  <br />
                  <p>Giving: {highlight.loveLangGiving}</p>
                  <p>Receiving: {highlight.loveLangReceiving}</p>
                  <br />
                  <p>
                    Interests:{' '}
                    {highlight.user_interests.reduce((acc, curr) => {
                      return acc + curr.label + ' ';
                    }, '')}
                  </p>
                </div>
              </motion.div>
            </Link>
            <ChevronRight fontSize="large" onClick={() => handlePic(1)} />
          </div>
          <div className="media-scroller">
            <div className="matchesForEachUser">
              {matches
                ? matches.map((match) => {
                    return (
                      <span key={match.id}>
                        <div
                          onClick={() => punchTheDamnedPin(match)}
                          className={
                            pushPin[match.id]
                              ? `pushPin ${pushPin[match.id]}`
                              : 'pushPin'
                          }
                        >
                          <PushPinIcon
                            style={{ width: '30px', height: '30px' }}
                          />
                        </div>
                        <motion.div
                          onClick={function (event) {
                            setHighlight(match);
                          }}
                          className="matches"
                          key={match.id}
                          whileHover={{
                            scale: 1.2,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                        >
                          <h3>
                            {match.firstname} {match.lastname}
                          </h3>
                          <br />
                          <p>
                            <img
                              className="matchesProfilePic"
                              src={match.avatar_url}
                              alt="Profile Pic"
                            />
                          </p>
                          <p>Age: {match.age}</p>
                          <p>Gender: {match.gender}</p>
                          <div className="toggle">
                            <OpenInNewIcon />
                          </div>
                        </motion.div>
                      </span>
                    );
                  })
                : 'Sorry, but you have 0 matches'}
            </div>
          </div>
          <div className="matches-container">
            <GetMatchesButton setHighlight={setHighlight} />
          </div>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
