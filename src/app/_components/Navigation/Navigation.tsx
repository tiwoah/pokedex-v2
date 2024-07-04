import React from "react";
import { getPokemonTypes } from "../../_lib/pokemonAPI";
import NavigationList from "./List/NavigationList";

export default async function Navigation() {
  const pokemonTypes = await getPokemonTypes();

  return (
    <nav className="hsm:sticky top-0 self-start p-4 xl:p-6 pr-6 xl:pr-8">
      <NavigationList pokemonTypes={pokemonTypes}></NavigationList>
    </nav>
  );
}
