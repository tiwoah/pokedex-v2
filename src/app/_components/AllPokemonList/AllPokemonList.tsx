"use client";
import { getAllPokemonFromSlice } from "@/app/_lib/pokemonAPI";
import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

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
  const itemsPerFetch = 5;
  const [offset, setOffset] = useState(40);
  const [pokemonList, setPokemonList] = useState<pokemon[]>(initialPokemonList);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const loadMoreItems = () => {
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

  const lastItemRef = useRef<HTMLHeadingElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(async (entries) => {
        const entry = entries[0];

        // Load more items when reaching last item
        if (entry.isIntersecting) {
          if (isFetching.current) {
            // Wait until able to fetch
            while (isFetching.current) {
              await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before trying again
            }
          }
          loadMoreItems();
        }
      });
      observer.observe(lastItemRef.current);

      // Save observer reference for cleanup
      observerRef.current = observer;

      // See last item
      lastItemRef.current.style.backgroundColor = "#899";
    }
  }, [pokemonList]);

  return (
    <>
      {pokemonList.map((pokemonInfo: pokemon, i: number) => (
        <li key={pokemonInfo.url} className="">
          {i === pokemonList.length - 1 ? (
            <PokemonCard
              ref={lastItemRef}
              pokemonURL={pokemonInfo.url}
              pokemonName={pokemonInfo.name}
            />
          ) : (
            <PokemonCard
              pokemonURL={pokemonInfo.url}
              pokemonName={pokemonInfo.name}
            />
          )}
        </li>
      ))}
    </>
  );
}
