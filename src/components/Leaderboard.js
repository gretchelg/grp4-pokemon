import { useNavigate, NavLink } from "react-router-dom";
import fetchAPI from "./Utils";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import "../../src/App.css";
import "./styles/Leaderboard.css";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const { userData } = useContext(DataContext);
  const date = new Date();
  const formattedDate = `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getDate()}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI.fetchAllUsers().then((res) => {
      console.log("I'm in the Leaderboard:", res.data);
      // Sort users by score
      const sortedUsers = res.data.sort((a, b) => b.score - a.score);
      setUsers(sortedUsers);
    });
  }, []);

  const handleBackButton = () => {
    navigate("/dashboard");
  };

  return (
    <div className="leaderboard-container">
      <div className="header">
        <NavLink to="/dashboard">
          <h3>Back</h3>
        </NavLink>
        <h2>Leaderboard</h2>
        <h3>Coins: {userData.coins}</h3>
      </div>
      {users.length > 0 && (
        <div className="best-player">
          <h2>Best Player</h2>
          <div className="player">
            <p className="player-name">{users[0].user_name}</p>
            <p className="player-score">Score: {users[0].score}</p>
          </div>
          <p className="date">{formattedDate}</p>
        </div>
      )}
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
