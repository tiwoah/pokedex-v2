"use client";
import React, { useRef, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useInfiniteScroll } from "@/app/_lib/useInfiniteScroll";

interface pokemonListProps {
  pokemonFavoritesList: {
    id: string;
    name: string;
    url: string;
  }[];
}

export default function PokemonList({
  pokemonFavoritesList,
}: pokemonListProps) {
  const maxLimit = pokemonFavoritesList.length;
  const [listLength, setListLength] = useState(15);
  const pokemonFavoritesListSliced = pokemonFavoritesList.slice(0, listLength);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const loadMoreItems = () => {
    setListLength((prevLength) => Math.min(prevLength + 20, maxLimit));
  };

  const lastItemRef = useInfiniteScroll(
    loadMoreItems,
    loading,
    isFetching,
    pokemonFavoritesListSliced
  );

  return (
    <>
      {pokemonFavoritesListSliced.map((pokemonInfo, i) => (
        <div key={pokemonInfo.url} className="">
          {i === listLength - 1 ? (
            <PokemonCard
              ref={lastItemRef}
              index={i}
              pokemonURL={pokemonInfo.url}
              pokemonName={pokemonInfo.name}
            />
          ) : (
            <PokemonCard
              index={i}
              pokemonURL={pokemonInfo.url}
              pokemonName={pokemonInfo.name}
            />
          )}
        </div>
      ))}
    </>
  );
}
