import fetchAPI from './Utils';
import { useState, useEffect } from 'react';
import "../../src/App.css";
import "./styles/Leaderboard.css";

export default function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchAPI.fetchAllUsers()
      .then(res => { 
          console.log("I'm in the Leaderboard:", res.data);
          // Sort users by score
          const sortedUsers = res.data.sort((a, b) => b.score - a.score);
          setUsers(sortedUsers);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="header">
        <button className="back-button">Back</button>
        <h1 className="title">Leaderboard</h1>
        {users.length > 0 && <p className="score">Score: {users[0].score}</p>}
      </div>
      {users.length > 0 && 
      <div className="best-player">
        <h2>Best Player</h2>
        <div className="player">
          <p className="player-name">{users[0].user_name}</p>
          <p className="player-score">Score: {users[0].score}</p>
        </div>
        <p className="date">March 17</p>
      </div>}
      <div className="players-list">
        {users.map((user, index) => (
          <div key={index} className="player">
            <p className="player-name">{user.user_name}</p>
            <p className="player-score">Score: {user.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
