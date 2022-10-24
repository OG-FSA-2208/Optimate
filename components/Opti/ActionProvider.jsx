import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleReport = () => {
    const botMessage = createChatBotMessage('Would you please tell us more?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleHarassment = () => {
    const botMessage = createChatBotMessage(
      'I am sorry to hear. Please tell us the full name of the user and we will investigate. This will be confidential.'
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

    setState((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, botMessage],
      };
    });
  };

  const handleName = (name) => {
    const botMessage = createChatBotMessage(
      `Can you provide ${name}'s full name?`
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

  const handleEmptyString = () => {
    const botMessage = createChatBotMessage(
      'I`m sorry. I seem to have trouble understanding. Can you repeat what you just said?'
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleFAQ = () => {
    const botMessage = createChatBotMessage(
      'Please check out our FAQ page below.'
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleLogin = () => {
    const botMessage = createChatBotMessage('Please log in to report user.');

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
            handleReport,
            handleHarassment,
            handleMatch,
            handleEndOfConvo,
            handleFAQ,
            handleEmptyString,
            handleName,
            handleLogin,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
