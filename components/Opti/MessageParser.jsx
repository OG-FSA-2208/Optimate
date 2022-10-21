import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';
import { blacklistUser } from '../../store/reducers/blacklistSlice';

const MessageParser = ({ children, actions }) => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  useEffect(() => {
    dispatch(getAllUserMatches());
    // dispatch(blacklistUser());
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
      return actions.handleReport();
    }

    words.map((word) => {
      if (message.includes(word)) {
        response = true;
        return actions.handleHarassment();
      }
    });

    matches.map((match) => {
      if (message.includes(match.firstname)) {
        response = true;
        if (message.includes(match.lastname)) {
          console.log('printoutmessage', message);
          // dispatch(blacklistUser(match.firstname, match.lastname));
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
