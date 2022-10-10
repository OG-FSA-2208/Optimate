import React from 'react';

const dummy = [
  {
    id: 1,
    avatar_url:
      'https://static.wikia.nocookie.net/suitelife/images/8/85/London_Tipton_3.jpg/revision/latest?cb=20110505214610',
    firstname: 'London',
    lastname: 'Tipton',
  },
  {
    id: 2,
    avatar_url:
      'https://static.wikia.nocookie.net/suitelife/images/8/85/London_Tipton_3.jpg/revision/latest?cb=20110505214610',
    firstname: 'Zach',
    lastname: 'Efron',
  },
];

export default function Matches() {
  return (
    <div className="match-list">
      <ul>
        {dummy.map((user) => (
          <li key={user.id}>
            <img src={user.avatar_url} alt="user profile image" />
            <p>
              {user.firstname}
              <br />
              {user.lastname}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
