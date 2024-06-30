import React from "react";
import { getPokemonTypes } from "../../_lib/pokemonAPI";
import NavigationList from "./List/NavigationList";

export default async function Navigation() {
  const pokemonTypes = await getPokemonTypes();

  return (
    <nav className="py-12">
      <h2>Navigation</h2>
      <NavigationList pokemonTypes={pokemonTypes}></NavigationList>
    </nav>
  );
}
