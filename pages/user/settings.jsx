import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import UpdateUserAuth from '../../components/UpdateUserAuth';

import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function settings() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getAllUserMatches());
  }, []);
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
          <UpdateUserAuth />
        </div>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
