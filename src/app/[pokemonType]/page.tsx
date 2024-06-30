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
        <>
          <h1>{pokemonType}</h1>
          <ul>
            <PokemonList pokemonListOfType={pokemonListOfType} />
          </ul>
        </>
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
