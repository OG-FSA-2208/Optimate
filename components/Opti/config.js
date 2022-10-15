import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './BotAvatar';

const botName = 'Opti the 🐙';

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi there gorgeous ;) I'm ${botName} How can I help you today?`
    ),
  ],
  botName: botName,

  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: '#faaab0',
          padding: '10px',
          borderRadius: '3px',
        }}
      >
        {'Opti the 🐙'}
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: '',
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#faaab0',
    },
    chatButton: {
      backgroundColor: '#ff939c',
    },
  },
};

export default config;
