import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log('dsfsdfsdfsdf', actions);
    if (message.includes('hello')) {
      console.log(message);
      console.log('hi');
      actions.handleHello();
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
