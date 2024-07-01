import AllPokemonList from "./_components/AllPokemonList/AllPokemonList";
import { getAllPokemonFromSlice } from "./_lib/pokemonAPI";

export default async function Home() {
  try {
    const initialPokemonList = await getAllPokemonFromSlice("20", "0");

    return (
      <section>
        <h1>All Pokemon</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3 pt-6">
          <AllPokemonList initialPokemonList={initialPokemonList} />
        </div>
      </section>
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
