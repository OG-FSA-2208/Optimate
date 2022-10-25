import React from 'react';
import { motion } from 'framer-motion';
import ForwardIcon from '@mui/icons-material/Forward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';

export default function faq() {
  //   const [isActive, setIsActive] = useState(false);
  return (
    <div className="FAQ">
      <h1>FAQ</h1>
      <br />
      <br />
      <h2>MATCHING AND MESSAGING</h2>
      {/* <motion.div> */}
      <div className="forwardIcon">
        <ForwardIcon
          style={{ height: '17px', color: 'blue' }}
          //TODO: onClick={() => console.log('hello')}
        />
        Why am I not getting matches besides my daily match?
      </div>
      <i>
        Make sure you have completed your profile.
        <p>
          For the men, shirtless mirror pics highly <u>NOT</u> recommended
          (unless you have a killer smile in the photo 😜)
        </p>
      </i>
      {/* </motion.div> */}
      <br />
      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        What does the pin feature do?
      </p>
      <i>
        The pin feature allows you to like a match and if it is reciprocated,
        you and the match will both be notified.
      </i>
      <br />
      <br />
      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        Can I see if my match read my messages?
      </p>
      <i>
        There is no such feature at the moment. Just be patient and trust the
        process.
      </i>
      <br />
      <br />
      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        Why did one of my matches disappear?
      </p>
      <i>
        Maximum number of matches you can receive is 8. If you did not pin your
        match, FIFO happens :)
      </i>
      <br />
      <br />
      <br />
      <br />
      <h2>DATING ADVICE</h2>
      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        Who should pay on the first date?
      </p>
      <i>
        Read:{' '}
        <a
          target="_blank"
          href="https://www.elitesingles.com/mag/relationship-advice/who-should-pay-for-date"
        >
          Survey says...
        </a>
      </i>
      <br />
      <br />

      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        One of my matches ghosted me. What do I do?
      </p>
      <i>
        Read:{' '}
        <a
          target="_blank"
          href="https://www.datingadvice.com/online-dating/ghosted-dating-app"
        >
          Ghost City 👻
        </a>
      </i>
      <br />
      <br />

      <p>
        <ForwardIcon style={{ height: '17px', color: 'blue' }} />I am an anxious
        lover. What can I do?
      </p>
      <p>
        <i>
          Read:{' '}
          <a
            target="_blank"
            href="https://www.nytimes.com/2021/11/06/style/anxious-avoidant-secure-attached-book.html"
          >
            Attached By Amir Levine and Rachel Heller
          </a>
        </i>
      </p>
      <br />
      <br />
      <br />
      <div className="email">
        <h4>
          <i>
            Still have questions? <p>Contact us: ZECC-W@optim8.com</p>
          </i>
        </h4>
      </div>
    </div>
  );
}
