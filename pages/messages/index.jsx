//landing page for /messages
import Matches from '../../components/Matches';

export default function Messages() {
  return (
    <div className="messages">
      <div className="column match-list">
        <Matches />
      </div>
      <div className="column chatMessageBox"></div>
    </div>
  );
}
