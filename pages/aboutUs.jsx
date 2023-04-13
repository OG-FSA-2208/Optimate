import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function aboutUs() {
  return (
    <div className="aboutUs">
      <Head>
        <title>Optim8 | About Us</title>
      </Head>
      <h1>
        <u className="ZECC-W">ABOUT US:</u>
        <div className="copyright"> ©ZECC-W</div>
      </h1>
      <br />
      <div className="members">
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/zach-byerley/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="images/zach.jpg"
            />
          </a>
          Zach Byerley
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/echos-echo/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="images/eve.jpg"
            />
          </a>
          Eve Cho
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/codylchan/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="images/cody.jpg"
            />
          </a>
          Cody Chan
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/corygold/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="images/cory.jpg"
            />
          </a>
          Cory Gold
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/thinkingoutlau/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="images/winnie.jpg"
            />
          </a>
          Winnie Lau
        </h3>
      </div>
      <br />
      <br />
      <h2>
        Github:{' '}
        <u>
          <a target="_blank" href="https://github.com/OG-FSA-2208/Optimate">
            https://github.com/OG-FSA-2208/Optimate
          </a>
        </u>
      </h2>
      <br />
    </div>
  );
}
