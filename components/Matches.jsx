import React from 'react';

export default function Matches() {
  return (
    <div className="match-list">
      <ul>
        <li>MATCH ONE</li>
        <li>MATCH TWO</li>
        {/* each li here will be a small user card that links to /messages/userID */}
      </ul>
    </div>
  );
}
