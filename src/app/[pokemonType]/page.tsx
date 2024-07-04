// Page for list of a specific pokemon type

import PokemonList from "../_components/PokemonList/PokemonList";
import { getPokemonTypes, getPokemonFromTypeURL } from "../_lib/pokemonAPI";

interface pokemonType {
  name: string;
  url: string;
}

export default async function PokemonTypePage({
  params,
}: {
  params: { pokemonType: string };
}) {
  const { pokemonType } = params;

  try {
    const pokemonTypes = await getPokemonTypes();

    const selectedPokemonTypeInfo = pokemonTypes.find(
      (info: pokemonType) => info.name === pokemonType
    );

    if (!selectedPokemonTypeInfo) {
      return (
        <div>
          <h1>Error</h1>
          <p>Pokemon Type not found</p>
        </div>
      );
    }

    if (selectedPokemonTypeInfo) {
      const pokemonListOfType = await getPokemonFromTypeURL(
        selectedPokemonTypeInfo.url
      );

      return (
        <section>
          <h1 className="capitalize">{pokemonType} Type Pokemon</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 2xl:gap-3 pt-6">
            <PokemonList pokemonListOfType={pokemonListOfType} />
          </div>
        </section>
      );
    }
  } catch {
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred while fetching data</p>
      </div>
    );
  }
}
