import { useState, useEffect } from 'react';

export default function EachPokemon() {
    const [pokemon, setPokemon] = useState([]);
    console.log("point 2");

// Fetch data for each endpoint from 1 to 300
    // function createUrl() {
    //     for (let i = 1; i <= 300; i++) {
    //     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //     await fetchData(url)
    //     }
    // }

    useEffect(() => {
        // const url = `https://pokeapi.co/api/v2/pokemon/1`;
        const fetchData = async () => {
            try{
                const getData = async (url) => {
                const res = await fetch(url);
                const data = await res.json();
                setPokemon(data);
                console.log("point3:", data)
                }
        
                for (let i = 1; i <= 300; i++) {
                const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                await getData(url)    
            }
                }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
},[])


    return (
        <div></div>
    )

}