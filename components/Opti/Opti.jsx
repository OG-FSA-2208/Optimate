import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config.js';
import MessageParser from './Messageparser.jsx';
import ActionProvider from './ActionProvider.jsx';

const MyComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default MyComponent;
