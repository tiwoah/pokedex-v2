"use client";
import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

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
  const [listLength, setListLength] = useState(30);
  const pokemonListOfTypeSliced = pokemonListOfType.slice(0, listLength);

  const loadMoreItems = () => {
    setListLength((prevLength) => Math.min(prevLength + 20, maxLimit));
  };

  const lastItemRef = useRef<HTMLHeadingElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];

        // Load more items when reaching last item
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      });
      observer.observe(lastItemRef.current);

      // Save observer reference for cleanup
      observerRef.current = observer;

      // See last item
      lastItemRef.current.style.backgroundColor = "#899";
    }
  }, [lastItemRef.current]);

  return (
    <>
      {pokemonListOfTypeSliced.map((pokemonInfo, i) => (
        <li key={pokemonInfo.pokemon.url} className="">
          {i === listLength - 1 ? (
            <PokemonCard
              ref={lastItemRef}
              pokemonURL={pokemonInfo.pokemon.url}
              pokemonName={pokemonInfo.pokemon.name}
            />
          ) : (
            <PokemonCard
              pokemonURL={pokemonInfo.pokemon.url}
              pokemonName={pokemonInfo.pokemon.name}
            />
          )}
        </li>
      ))}
    </>
  );
}
