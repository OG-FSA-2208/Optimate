import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello back at you ;)');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleReport = () => {
    const botMessage = createChatBotMessage('Would you please tell us more?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleHarassment = () => {
    const botMessage = createChatBotMessage(
      'I am sorry to hear. Please tell us the full name of the user and we will investigate.'
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleMatch = () => {
    const botMessage = createChatBotMessage(
      'We will look into it and handle it from here. We will remove the user from your match list. Please continue to let us know if there are any other issues.'
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleEndOfConvo = () => {
    const botMessage = createChatBotMessage(
      'Hope you have an amazing rest of your day. Goodbye!'
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleReport,
            handleHarassment,
            handleMatch,
            handleEndOfConvo,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
