import fetchAPI from './Utils'
import { useState, useEffect } from 'react';

export default function Leaderboard(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAPI.fetchAllUsers()
        .then(res => { 
            console.log("I'm in the Leaderboard:", res.data) 
            setUsers(res.data)
        }
            )
    }, [])

    return (
        <div>Leaderboard</div>
    )
}