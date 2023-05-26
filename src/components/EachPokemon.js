// THIS COMPONENT IS A ONE-TIME-RUN TO CREATE THE POKEMON.JSON

import { useState, useEffect } from 'react';
// import Pagination from './Pagination';
// import BeatLoader from "react-spinners/BeatLoader";

export default function EachPokemon() {
    const [pokemon, setPokemon] = useState([]);

        // const url = `https://pokeapi.co/api/v2/pokemon/1`;
        const fetchData = async () => {
            try{
                const getData = async (url) => {
                const res = await fetch(url);
                const data = await res.json();

                const { id, name, stats, sprites: { other: { dream_world: { front_default}}}} = data

                let pokemonObj =  {
                    id,
                    name,
                    stats,
                    front_default,

                }
                console.log("object:", pokemonObj )
                setPokemon(oldValue => [...oldValue,pokemonObj]); 
                }
        
                for (let i = 1; i <= 500; i++) {
                const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                await getData(url)    
            }
                }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
    useEffect(() => {
        fetchData();
},[])

console.log("json_pokemon:", pokemon)

// const [pokemons, setPokemons] = useState([]);
  // const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  // const [nextPageUrl, setNextPageUrl] = useState()
  // const [prevPageUrl, setPrevPageUrl] = useState()
  // const [loading, setLoading] = useState(true)


  // useEffect(() => {
  //   setLoading(true);
  //     const fetchData = async () => {
  //     const res = await fetch(currentPageUrl)
  //     const data = await res.json();
  //     setPokemons(data.results)
  //     setNextPageUrl(data.next)
  //     setPrevPageUrl(data.previous)
  //     // setPokemons(data.results.map(p => p.className))
  //     setLoading(false);
  //     }
  //     fetchData();
  // }, [currentPageUrl])

  // console.log("pokemons:", pokemons);
  // function gotoNextPage() {
  //   setCurrentPageUrl(nextPageUrl)
  // }

  // function gotoPrevPage() {
  //   setCurrentPageUrl(prevPageUrl)
  // }

    return (
        <div>
        {/* {pokemon?.map((singlepokemon)=>{
            <div>pokemon</div>
        })} */}

{/* spiner
    {loading ? (<BeatLoader
        color="#f5a214"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/>)
        : (
        <ul>Hello
        {pokemons.map((pokemon) => (
        <li>
            <p>{pokemon.name}</p>
            <p>{pokemon.url}</p>
            </li>
        ))}
        </ul>
        )
        }     
<Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
  /> */}
        </div>
    )

}