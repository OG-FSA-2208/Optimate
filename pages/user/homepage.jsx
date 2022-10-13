import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const matches = useSelector((state) => state.matches);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllUserMatches());
  }, []);

  const handleClick = (event) => {
    event.target.classList.toggle('active');
    console.log('hello');
    setToggle(!toggle);
  };

  return (
    <div>
      {profile.id ? (
        <div>
          <Link href="/user/profile">
            <a>
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
                <br></br>
                <h2>My Profile:</h2>

                <br></br>

                <img src={profile.avatar_url} className="profilePic" />

                <p>
                  Full name: {profile.firstname} {profile.lastname}
                </p>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                <p>About: {profile.about}</p>
              </motion.div>
            </a>
          </Link>
          {/* </div> */}
          <div className="media-scroller">
            <div className="matchesForEachUser">
              {matches
                ? matches.map((match) => {
                    return (
                      <motion.div
                        onClick={(event) => handleClick(event)}
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
                        <p>Highlight: {match.highlight}</p>
                        <div className="matchesAboutMe">
                          About: {match.about}
                        </div>
                        <p>Occupation: {match.occupation}</p>
                        <p>Status: {match.status}</p>
                        <p>Location: {match.location}</p>
                        <p>Love Language (Giving): {match.loveLangGiving}</p>
                        <p>
                          Love Language (Receiving): {match.loveLangReceiving}
                        </p>
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
