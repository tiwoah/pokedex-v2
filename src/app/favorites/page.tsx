"use client";

import { useEffect, useState } from "react";
import { getFavorites } from "../_lib/handleFavorites";
import PokemonFavoritesList from "../_components/PokemonFavoritesList/PokemonFavoritesList";
import Image from "next/image";

interface Favorite {
  id: string;
  name: string;
  url: string;
}

export default function PokemonTypePage() {
  const [pokemonFavoritesList, setPokemonFavoritesList] = useState<Favorite[]>(
    []
  );

  useEffect(() => {
    try {
      const favorites = getFavorites();
      setPokemonFavoritesList(favorites);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section>
      <h1 className="capitalize">Favorite Pokemon</h1>
      {pokemonFavoritesList.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 2xl:gap-3 pt-6">
          <PokemonFavoritesList pokemonFavoritesList={pokemonFavoritesList} />
        </div>
      ) : (
        <div className="pt-6 flex items-center">
          Favorite pokemon by tapping the
          <span className="inline-block px-1">
            <Image
              src="/icons/star.png"
              width={30}
              height={30}
              alt="yuh"
              className="dark:invert"
            />
          </span>
          icon.
        </div>
      )}
    </section>
  );
}
