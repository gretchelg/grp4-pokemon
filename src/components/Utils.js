// export default function Utils() {
// function Utils() {
//     const fetchAllPokemons = async () => {
//         const res = await fetch("http://localhost:4000/api/pokemons")
//         const data = await res.json();
//         console.log("point1:", data)
//         }
    // const fetchOnePokemons = async () => {
    //     const res = await fetch("http://localhost:4000/api/pokemons/6470c3a6f3a67278edb83672")
    //     const data = await res.json();
    //     console.log("point1:", data)
    //     }
// 
//     return (
//         <>this is some JSX inside utils</>
//     )
// }

const fetchAllPokemons = async () => {
    const res = await fetch("http://localhost:4000/api/pokemons")
    const data = await res.json();
    console.log("point1:", data)
    }

const fetchOnePokemonFromTheDB = async () => {
    const res = await fetch("http://localhost:4000/api/pokemons/6470c3a6f3a67278edb83672")
    const data = await res.json();
    console.log("point1:", data)
    }

const fetchOnePokemonFromTheDBv2 = async () => {
    fetch("http://localhost:4000/api/pokemons/6470c3a6f3a67278edb83672")
        .then(res => res.json())
        .then(data => console.log("point1:", data))
    }
    
const fetchOnePokemonFromTheDBv3 = async () => {
    return fetch("http://localhost:4000/api/pokemons/6470c3a6f3a67278edb83672")
        .then(res => res.json())
        .then(data => { 
            console.log("point1:", data)
            return data
        })
    }
    
const myMessage = "A const message from utils package"
const myGreeting = "hello"

export default {
    message: myMessage,
    greeting: myGreeting,
    fetchOne: fetchOnePokemonFromTheDBv3
}
