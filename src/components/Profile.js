import fetchAPI from './Utils'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [pokemon, setPokemon] = useState([]);
    const { id } = useParams();
    console.log("id:", id)

    useEffect(() => {
        fetchAPI.fetchOnePokemon(id)
        .then(res => {
        console.log("I'm in the Pokemon Profile:", res.data)
        setPokemon(res.data)
        })
    }, [])
    
    return(
        <div>Profile Page</div>
    )
}