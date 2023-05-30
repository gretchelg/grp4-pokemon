import fetchAPI from './Utils'
import { useState, useEffect } from 'react';

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

    return (
        <div>User Dashboard</div>
    )
}