import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUserMatches } from '../../store/reducers/matchesSlice';

const MessageParser = ({ children, actions }) => {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches);
  useEffect(() => {
    dispatch(getAllUserMatches());
  }, []);

  const words = [
    'harass',
    'harassed',
    'harassing',
    'inappropriate',
    'condescending',
    'stalked',
    'stalk',
    'manipulated',
    'manipulative',
    'revenge',
    'crazy',
    'scary',
  ];

  const parse = (message) => {
    if (message.includes('report') || message.includes('block')) {
      actions.handleReport();
    }

    words.map((word) => {
      if (message.includes(word)) {
        actions.handleHarassment();
        return;
      }
    });

    matches.map((match) => {
      if (
        message.includes(match.firstname) &&
        message.includes(match.lastname)
      ) {
        actions.handleMatch();
      }
    });

    if (message.includes('thank you') || message.includes('Thank you')) {
      actions.handleEndOfConvo();
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
