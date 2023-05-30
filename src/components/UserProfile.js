import fetchAPI from './Utils';
import { useState, useEffect } from 'react';
import "../../src/App.css";
import "./styles/userProfile.css";



export default function UserProfile() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetchAPI.fetchOneUser()
        .then(res => { 
            console.log("I'm in the Dashboard:", res.data) 
            setUser(res.data)
        }
            )
    }, [])

    if (!user) return null;

    return (
      <div className="dashboard-container">
        <div className="header">
          <div className="user-info">
            <p className="score">Score: {user.score}</p>
            <h1 className="username">{user.user_name}</h1>
            <p className="coins">Coins: {user.coins}</p>
          </div>
        </div>
        <div className="action-buttons">
          <button className="action-button">Collect a Pokemon</button>
          <button className="action-button">Fight Now</button>
          <button className="action-button">Leaderboard</button>
        </div>
        <h2>Collection</h2>
        <div className="collection">
        {user.collections && user.collections.map((pokemon, index) => (
          <div key={index} className="pokemon">{pokemon}</div>
        ))}
      </div>
      </div>
    );
}
