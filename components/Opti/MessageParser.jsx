import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import { blacklistUser } from '../../store/reducers/blacklistSlice';

const MessageParser = ({ children, actions }) => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  const userId = useSelector((state) => state.user.id);
  useEffect(() => {
    dispatch(getAllUserMatches());
  }, []);

  const words = [
    'harass',
    'inappropriate',
    'condescending',
    'stalk',
    'manipulated',
    'manipulative',
    'revenge',
    'crazy',
    'scary',
    'kill',
  ];

  const parse = (message) => {
    let response = false;
    if (message.includes('report') || message.includes('block')) {
      if (!userId) {
        return actions.handleLogin();
      }
      return actions.handleReport();
    }

    words.map((word) => {
      if (message.includes(word)) {
        response = true;
        return actions.handleHarassment();
      }
    });

    matches.map((match) => {
      if (
        message.includes(match.firstname) ||
        message.includes(match.firstname.toLowerCase())
      ) {
        response = true;
        if (
          message.includes(match.lastname) ||
          message.includes(match.lastname.toLowerCase())
        ) {
          dispatch(blacklistUser(userId, match.id));
          return actions.handleMatch();
        }
        return actions.handleName(match.firstname);
      }
    });

    if (
      message.includes('thank you') ||
      message.includes('Thank you') ||
      message.includes('thanks')
    ) {
      return actions.handleEndOfConvo();
    }
    if (message === '') {
      return actions.handleEmptyString();
    }
    if (!response) {
      return actions.handleFAQ();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
