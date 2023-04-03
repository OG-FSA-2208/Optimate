//landing page for /messages
import Matches from '../../components/Matches';
import Head from 'next/head';

export default function Messages() {
  return (
    <div className="messages">
      <Head>
        <title>Optim8 | Messages</title>
      </Head>
      <div className="column match-list">
        <Matches />
      </div>
      <div
        className="column chatMessageBox mobile"
        style={{ visibility: 'hidden' }}
      ></div>
    </div>
  );
}
