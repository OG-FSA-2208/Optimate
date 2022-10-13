import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../store/reducers/profileSlice';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';

export default function Profile() {
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);

  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(getAllUserMatches());
  }, []);

  const handleClick = (event) => {
    event.target.classList.toggle('active');

    console.log('hello');
  };

  return (
    <div>
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
                    // drag="y"
                    // dragConstraints={{
                    //   top: 18,
                    //   bottom: 0,
                    // }}
                    whileTap={{
                      scale: 1.3,
                    }}
                  >
                    <h3>
                      {match.firstname} {match.lastname}
                    </h3>
                    {/* <p> */}
                    <img
                      className="matchesProfilePic"
                      src={match.avatar_url}
                      alt="Profile Pic"
                    />
                    {/* </p> */}
                    <p>Age: {match.age}</p>
                    <p>Gender: {match.gender}</p>
                    <p>Highlight: {match.highlight}</p>
                    <p>About: {match.about}</p>
                    {/* <div className="matchesAboutMe">About: {match.about}</div> */}
                    <p>Occupation: {match.occupation}</p>
                    <p>Status: {match.status}</p>
                    <p>Location: {match.location}</p>
                    <p>Love Language (Giving): {match.loveLangGiving}</p>
                    <p>Love Language (Receiving): {match.loveLangReceiving}</p>
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
  );
}
