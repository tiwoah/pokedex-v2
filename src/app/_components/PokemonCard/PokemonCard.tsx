"use client";
import { pokemonColorVariants } from "@/app/_lib/colorVariants";
import { getPokemon } from "@/app/_lib/pokemonAPI";
import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  addFavorite,
  checkIsFavorited,
  removeFavorite,
} from "@/app/_lib/handleFavorites";
import ToggleFavorite from "../ToggleFavorite";

interface PokemonCardProps {
  index: number;
  pokemonName: string;
  pokemonURL: string;
}

interface pokemonData {
  name: string | null;
  id?: number;
  sprites?: {
    front_default?: string;
    other?: {
      home?: {
        front_default?: string;
      };
      showdown?: {
        front_default?: string;
      };
    };
  };
  [key: string]: any;
}

interface pokemonType {
  name: string;
  url: string;
}

interface pokemonDataTypes {
  slot: number;
  type: pokemonType;
}

type CardKey = keyof typeof pokemonColorVariants.card;
type TagKey = keyof typeof pokemonColorVariants.tag;

const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ index, pokemonName, pokemonURL }, ref) => {
    const [loading, setLoading] = useState(true);
    const [contentLoading, setContentLoading] = useState(true);

    const [pokemonData, setPokemonData] = useState<pokemonData>({
      name: null,
    });

    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

    useEffect(() => {
      const fetchPokemonData = async () => {
        setLoading(true);

        try {
          const data = await getPokemon(pokemonURL);

          if (data.types) {
            const typesNames = data.types.map(
              (info: pokemonDataTypes) => info.type.name
            );
            setPokemonTypes(typesNames);
          }

          setPokemonData(data);
        } catch (err) {
          console.log("Failed to fetch Pokemon data");
        } finally {
          setLoading(false);
        }
      };

      fetchPokemonData();
    }, []);

    const primaryType = pokemonTypes.length > 0 ? pokemonTypes[0] : "all";
    const imageUrl =
      pokemonData.sprites?.other?.home?.front_default ||
      pokemonData.sprites?.front_default;

    return (
      <Link
        href={"/pokemon/" + pokemonName}
        className="relative w-full h-full max-w-full max-h-full flex rounded-3xl aspect-[15/8] 2xl:aspect-[15/7]"
      >
        <div
          ref={ref}
          className={`relative grow p-5 sm:p-7 rounded-3xl text-black transition-all duration-300 ${
            pokemonColorVariants.card[primaryType as CardKey]
          } ${
            loading || contentLoading
              ? "blur-md bg-gray-200 dark:bg-gray-800 animate-pulse"
              : "sm:hover:scale-[1.02] sm:hover:z-30 sm:hover:drop-shadow-3xl sm:dark:hover:drop-light-3xl"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden w-full h-full rounded-3xl pointer-events-none">
            <div className="absolute bottom-0 left-0 dots-sm lg:dots w-full h-[30%]"></div>
            <div className="absolute -right-[25%] -bottom-[15%] w-[70%] aspect-square opacity-5">
              <Image
                src="/pokeball.png"
                fill
                alt="type icon"
                sizes="400px"
                priority={index < 3}
              />
            </div>
          </div>
          <div className="absolute -right-[5%] -bottom-[0%] h-[110%] aspect-square pointer-events-none">
            {!loading && imageUrl && (
              <Image
                src={imageUrl}
                onLoad={() => {
                  setContentLoading(false);
                }}
                fill
                alt={`Pokemon sprite: ` + pokemonName}
                sizes="400px"
                priority={index < 3}
              />
            )}
          </div>
          <div className="relative z-10 w-fit max-w-[58%]">
            <p className="opacity-80 text-base font-normal sm:text-base sm:leading-4 md:text-base md:leading-4">
              {loading
                ? "#???"
                : "#" + pokemonData.id?.toString().padStart(3, "0")}
            </p>
            <h2 className="uppercase">{pokemonName.replace(/-/g, " ")}</h2>
            {!loading && (
              <div className="flex mt-2 gap-1">
                {pokemonData.types &&
                  pokemonData.types.map((info: pokemonDataTypes) => (
                    <div
                      key={info.slot}
                      className={`rounded-xl p-1 px-2 capitalize text-xs md:text-sm xl:text-xs 2xl:text-sm ${
                        pokemonColorVariants.tag[info.type.name as TagKey]
                      }`}
                    >
                      {info.type.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {pokemonData.id && (
            <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 flex">
              <ToggleFavorite
                id={pokemonData.id.toString()}
                name={pokemonName}
                url={pokemonURL}
              />
            </div>
          )}
        </div>
      </Link>
    );
  }
);

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;
