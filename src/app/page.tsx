import AllPokemonList from "./_components/AllPokemonList/AllPokemonList";
import { getAllPokemonFromSlice } from "./_lib/pokemonAPI";

export default async function Home() {
  try {
    const initialPokemonList = await getAllPokemonFromSlice("40", "0");

    return (
      <>
        <h1>All Pokemon</h1>
        <ul>
          <AllPokemonList initialPokemonList={initialPokemonList} />
        </ul>
      </>
    );
  } catch {
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred while fetching data</p>
      </div>
    );
  }
}
