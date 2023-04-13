import React from 'react';
import ForwardIcon from '@mui/icons-material/Forward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import Head from 'next/head';

export default function faq() {
  const [isActive, setIsActive] = useState('');

  return (
    <div className="FAQ">
      <Head>
        <title>Optim8 | FAQ</title>
      </Head>
      <h1>FAQ</h1>
      <h3>
        <a>
          <img
            className="tutorialSection"
            src="https://iwnfagrreicibkzmwlip.supabase.co/storage/v1/object/sign/tutorial/Homepage%20Tutorial.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0dXRvcmlhbC9Ib21lcGFnZSBUdXRvcmlhbC5wbmciLCJpYXQiOjE2NjY4MzgzMDksImV4cCI6MTk4MjE5ODMwOX0.IKei10EHFn_P7U1iOzN6W2uStdWMtd_rvjCJZJQEJRk&t=2022-10-27T02%3A38%3A29.008Z"
          />
        </a>
      </h3>
      <br />
      <br />
      <h2>MATCHING AND MESSAGING</h2>
      <p onClick={() => setIsActive('matches')}>
        {isActive === 'matches' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        Why am I not getting matches besides my daily match?
      </p>
      {isActive === 'matches' && (
        <>
          <p>Make sure you have completed your profile.</p>
          <p>
            For the men, shirtless mirror pics highly <u>NOT</u> recommended
            (unless you have a killer smile in the photo 😜)
          </p>
          <br />
        </>
      )}
      <p onClick={() => setIsActive('pin')}>
        {isActive === 'pin' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        What does the pin feature do?
      </p>
      {isActive === 'pin' && (
        <>
          <p>
            The pin feature allows you to like a match and if it is
            reciprocated, you and the match will both be notified.
          </p>
          <br />
        </>
      )}

      <p onClick={() => setIsActive('read')}>
        {isActive === 'read' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        Can I see if my match read my messages?
      </p>
      {isActive === 'read' && (
        <>
          <p>
            There is no such feature at the moment. Just be patient and trust
            the process.
          </p>
          <br />
        </>
      )}

      <p onClick={() => setIsActive('disappear')}>
        {isActive === 'disappear' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        Why did one of my matches disappear?
      </p>
      {isActive === 'disappear' && (
        <>
          <p>
            Maximum number of matches you can receive is 8. If you did not pin
            your match, FIFO happens :)
          </p>
          <br />
        </>
      )}

      <br />
      <h2>DATING ADVICE</h2>
      <p onClick={() => setIsActive('pay')}>
        {isActive === 'pay' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        Who should pay on the first date?
      </p>
      {isActive === 'pay' && (
        <>
          <p>
            &emsp;Read:{' '}
            <a
              target="_blank"
              href="https://www.elitesingles.com/mag/relationship-advice/who-should-pay-for-date"
            >
              Survey says...
            </a>
          </p>
          <br />
        </>
      )}

      <p onClick={() => setIsActive('ghost')}>
        {isActive === 'ghost' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        One of my matches ghosted me. What do I do?
      </p>
      {isActive === 'ghost' && (
        <>
          <p>
            &emsp;Read:{' '}
            <a
              target="_blank"
              href="https://www.datingadvice.com/online-dating/ghosted-dating-app"
            >
              Ghost City 👻
            </a>
          </p>
          <br />
        </>
      )}

      <p onClick={() => setIsActive('anxious')}>
        {isActive === 'anxious' ? (
          <ArrowDownwardIcon style={{ height: '17px', color: 'blue' }} />
        ) : (
          <ForwardIcon style={{ height: '17px', color: 'blue' }} />
        )}
        I am an anxious lover. What can I do?
      </p>
      {isActive === 'anxious' && (
        <>
          <p>
            &emsp;Read:{' '}
            <a
              target="_blank"
              href="https://www.nytimes.com/2021/11/06/style/anxious-avoidant-secure-attached-book.html"
            >
              Attached By Amir Levine and Rachel Heller
            </a>
          </p>
          <br />
        </>
      )}
      <br />
      <br />
      <div className="email">
        <h4>
          <p>Still have questions? </p>
          <p>Contact us: ZECC-W@optim8.com</p>
        </h4>
      </div>
    </div>
  );
}
