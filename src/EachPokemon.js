import { SignalCellularNodata } from '@mui/icons-material';
import { useState, useEffect } from 'react';

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
                const newArr = [...pokemon,pokemonObj]
                console.log("new array:", newArr)
                setPokemon(newArr); 
                // console.log("useState pokemone:", pokemon);



                // console.log("destructure item:", front_default)

                }
        
                for (let i = 1; i <= 10; i++) {
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

pokemon.length>5 && console.log(pokemon)

console.log("point3:", pokemon)

    return (
        <div>
            {pokemon?.map((singlepokemon)=>{
                <div>pokemon</div>
            })}
        </div>
    )

}