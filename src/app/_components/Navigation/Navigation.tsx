import React from "react";
import { getPokemonTypes } from "../../_lib/pokemonAPI";
import NavigationList from "./List/NavigationList";

export default async function Navigation() {
  const pokemonTypes = await getPokemonTypes();

  return (
    <nav className="py-0 md:sticky top-0 self-start p-4 xl:p-8 pr-8 xl:pr-14">
      <NavigationList pokemonTypes={pokemonTypes}></NavigationList>
    </nav>
  );
}
