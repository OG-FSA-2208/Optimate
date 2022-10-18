import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
// import '../../less/bot.less';
// import './Bot.css';
import config from './config.js';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';

const MyComponent = () => {
  return (
    <div id="bottie">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};
export default MyComponent;
