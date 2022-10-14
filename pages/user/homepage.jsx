import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { userAgent } from 'next/server';
import { getLoggedInUser } from '../../store/reducers/profileSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const profile = useSelector((state) => state.profile);
  const [highlight, setHighlight] = useState(profile);


  useEffect(() => {
    dispatch(getAllUserMatches());
    dispatch(getLoggedInUser()); 
  }, []);

   // const handleClick = (event) => {
   // console.log('show event', event.target.classList);
   // event.target.classList.toggle('active');
   // };

  return (
    <div>
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
                  {highlight.id === profile.id
                    ? 'Edit My Profile'
                    : 'Back to My Profile'}
                </p>
                <h2>
                  {highlight.firstname} {highlight.lastname}
                </h2>
                <br></br>
                <img src={highlight.avatar_url} className="profilePic" />
              </div>
              <div>
                <p>Age: {highlight.age}</p>
                <p>Gender: {highlight.gender}</p>
                <p>About: {highlight.about}</p>
                <p>Occupation: {highlight.occupation}</p>
                <p style={{ fontSize: '2em' }}>
                  {highlight.drinker ? '🍻' : null}{' '}
                  {highlight.smoker ? '🚬' : null}
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
                          // handleClick(event);
                          setHighlight(match);
                        }}
                        className="matches"
                        key={match.id}
                        whileHover={{
                          scale: 1.2,
                        }}
                        // drag="x"
                        // dragConstraints={{
                        //   right: 18,
                        //   left: 0,
                        // }}
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
                            // onClick={(event) => handleClick(event)}
                            className="matchesProfilePic"
                            src={match.avatar_url}
                            alt="Profile Pic"
                          />
                        </p>
                        <p>Age: {match.age}</p>
                        <p>Gender: {match.gender}</p>
                        {/* <p>Highlight: {match.highlight}</p>
                        <div className="matchesAboutMe">
                          About: {match.about}
                        </div>
                        <p>Occupation: {match.occupation}</p>
                        <p>Status: {match.status}</p>
                        <p>Location: {match.location}</p>
                        <p>Love Language (Giving): {match.loveLangGiving}</p>
                        <p>
                          Love Language (Receiving): {match.loveLangReceiving}
                        </p> */}
                        {/* <div className="toggle">
                          <OpenInNewIcon />
                        </div> */}
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
