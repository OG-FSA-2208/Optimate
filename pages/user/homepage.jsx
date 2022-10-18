import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { userAgent } from 'next/server'; // WHO PUT THIS IN HERE AND WHAT IS THIS???
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import Head from 'next/head';

export default function Profile() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const profile = useSelector((state) => state.profile);
  const [highlight, setHighlight] = useState(profile);

  useEffect(() => {
    dispatch(getAllUserMatches());
    dispatch(getLoggedInUser());
  }, []);

  return (
    <div>
      <Head>
          <title>Optimate</title>
      </Head>
      {highlight.id ? (
        <div>
          <Link
            href={highlight.id === profile.id ? '/user/profile' : '/messages'}
          >
            <motion.div
              className="myProfile"
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
              animate={
                {
                  // x: 1300,
                  // rotate: 360,
                  // opacity: isAnimating ? 1 : 0.5,
                  // scale: isAnimating ? 2 : 0,
                }
              }
            >
              <div>
                <p>
                  {highlight.id === profile.id ? 'Edit My Profile' : 'Message'}
                </p>
                <h2>
                  {highlight.firstname} {highlight.lastname}
                </h2>
                <br></br>
                <img src={highlight.avatar_url} className="profilePic" />
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
          {/* </div> */}
          <div className="media-scroller">
            <div className="matchesForEachUser">
              {matches
                ? matches.map((match) => {
                    return (
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
                        animate={
                          {
                            // x: 1300,
                            // rotate: 360,
                            // opacity: isAnimating ? 1 : 0.5,
                            // scale: isAnimating ? 2 : 0,
                          }
                        }
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
                    );
                  })
                : 'Sorry, but you have 0 matches'}
            </div>
          </div>
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
