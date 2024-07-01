"use client";
import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useInfiniteScroll } from "@/app/_lib/useInfiniteScroll";

interface pokemon {
  name: string;
  url: string;
}

interface pokemonListProps {
  pokemonListOfType: {
    pokemon: pokemon;
    slot: number;
  }[];
}

export default function PokemonList({ pokemonListOfType }: pokemonListProps) {
  const maxLimit = pokemonListOfType.length;
  const [listLength, setListLength] = useState(15);
  const pokemonListOfTypeSliced = pokemonListOfType.slice(0, listLength);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const loadMoreItems = () => {
    setListLength((prevLength) => Math.min(prevLength + 20, maxLimit));
  };

  const lastItemRef = useInfiniteScroll(
    loadMoreItems,
    loading,
    isFetching,
    pokemonListOfTypeSliced
  );

  return (
    <>
      {pokemonListOfTypeSliced.map((pokemonInfo, i) => (
        <div key={pokemonInfo.pokemon.url} className="">
          {i === listLength - 1 ? (
            <PokemonCard
              ref={lastItemRef}
              index={i}
              pokemonURL={pokemonInfo.pokemon.url}
              pokemonName={pokemonInfo.pokemon.name}
            />
          ) : (
            <PokemonCard
              index={i}
              pokemonURL={pokemonInfo.pokemon.url}
              pokemonName={pokemonInfo.pokemon.name}
            />
          )}
        </div>
      ))}
    </>
  );
}
