// import { getAllPokemons } from '../components/Utils'
import anObject from '../components/Utils'
import { useState, useEffect } from 'react';

export default function Gallery() {
    const [pokemons, setPokemons] = useState([]);

    // useEffect(() => {
    //     getAllPokemons();
    // }, [])

    anObject.fetchOne().then(data => setPokemons(data))
    

    return (
        <>
        {/* <anObject.myFunc/> */}
        <>{anObject.greeting}</>
        <>{anObject.message}</>
        <div>Pokemon Gallery</div>
        <>{JSON.stringify(pokemons)}</>
        </>
    )
}