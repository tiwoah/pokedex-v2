"use client";
import { getPokemon } from "@/app/_lib/pokemonAPI";
import React, { forwardRef, useEffect, useState } from "react";

interface PokemonCardProps {
  pokemonName: string;
  pokemonURL: string;
}

interface pokemonData {
  name: string | null;
  id?: number;
  [key: string]: any;
}

const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ pokemonName, pokemonURL }, ref) => {
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState<pokemonData>({
      name: null,
    });

    useEffect(() => {
      const fetchPokemonData = async () => {
        setLoading(true);

        try {
          const data = await getPokemon(pokemonURL);
          setPokemonData(data);
        } catch (err) {
          console.log("Failed to fetch Pokemon data");
        } finally {
          setLoading(false);
        }
      };

      fetchPokemonData();
    }, []);

    return (
      <h2 ref={ref}>{loading ? pokemonName : "loaded " + pokemonData.name}</h2>
    );
  }
);

export default PokemonCard;
