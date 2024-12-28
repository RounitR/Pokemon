import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Pokemon } from "./Pokemon";
import Loader from "./components/Loader";
import { FaSortAlphaDown } from "react-icons/fa";

export const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
  //search functionality
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-sull">
      <Navbar search={search} setSearch={setSearch} />
      <div className="flex w-full mt-56 overflow-hidden">
        <Pokemon
          search={search}
          setSearch={setSearch}
          setLoading={setLoading}
          pokemon={pokemon}
        />
      </div>
    </div>
  );
};
