"use client";
import { getAllPokemonFromSlice } from "@/app/_lib/pokemonAPI";
import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useInfiniteScroll } from "@/app/_lib/useInfiniteScroll";

interface pokemon {
  name: string;
  url: string;
}

interface initialPokemonListProps {
  initialPokemonList: pokemon[];
}

export default function AllPokemonList({
  initialPokemonList,
}: initialPokemonListProps) {
  const itemsPerFetch = 15;
  const [offset, setOffset] = useState(20);
  const [pokemonList, setPokemonList] = useState<pokemon[]>(initialPokemonList);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const fetchItems = () => {
    setOffset((prevOffset) => prevOffset + itemsPerFetch);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      if (isFetching.current || loading) return;

      isFetching.current = true;
      setLoading(true);

      try {
        const data = await getAllPokemonFromSlice(
          itemsPerFetch.toString(),
          offset.toString()
        );

        setPokemonList((prevList) => [...prevList, ...data]);
      } catch (err) {
        console.log("Failed to fetch Pokemon data");
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchPokemon();
  }, [offset]);

  const lastItemRef = useInfiniteScroll(
    fetchItems,
    loading,
    isFetching,
    pokemonList
  );

  return (
    <>
      {pokemonList.map((pokemonInfo: pokemon, i: number) => (
        <div key={pokemonInfo.url} className="">
          {i === pokemonList.length - 1 ? (
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
