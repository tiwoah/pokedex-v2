"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { pokemonColorVariants } from "@/app/_lib/colorVariants";
import Image from "next/image";

interface pokemonType {
  name: string;
  url: string;
}

interface NavigationListProps {
  pokemonTypes: pokemonType[];
}

interface PokemonTypeButtonProps {
  name: string;
  index: number;
}

type CardKey = keyof typeof pokemonColorVariants.card;

export default function NavigationList({ pokemonTypes }: NavigationListProps) {
  return (
    <ul className="gap-1 md:flex md:flex-col grid grid-cols-2 sm:grid-cols-3">
      {/* Special case button for page of All pokemon */}
      <PokemonTypeButton key={"all"} name={"all"} index={0} />

      {/* Page navigation buttons for each pokemon type */}
      {pokemonTypes.map((info: pokemonType, index: number) => {
        if (info.name === "stellar" || info.name === "unknown") return;
        return (
          <PokemonTypeButton
            key={info.name}
            name={info.name}
            index={index + 1}
          />
        );
      })}
    </ul>
  );
}

const PokemonTypeButton: React.FC<PokemonTypeButtonProps> = ({
  name,
  index,
}) => {
  const pathName = usePathname();
  const currentPokemonType = pathName.substring(1);
  const isActive =
    currentPokemonType === name || (pathName === "/" && name === "all");
  const srcImagePath =
    name === "all" ? "/icons/pokeball.png" : `/icons/${name}.svg`;

  return (
    <li
      className={`w-fit h-fit sm:place-self-center ${
        index % 2 === 0 ? "place-self-end" : "place-self-start"
      }`}
    >
      <Link
        href={name === "all" ? "/" : `/${name}`}
        className={`p-2 px-4 rounded-full  uppercase font-black text-white text-center flex items-center justify-between w-fit min-w-32 xl:min-w-40 transition-all duration-200 outline outline-2 text-xs md:text-sm xl:text-base  ${
          pokemonColorVariants.card[name as CardKey]
        } ${
          isActive
            ? " outline-black dark:outline-white md:translate-x-5"
            : "outline-black/0 dark:outline-white/0 md:hover:translate-x-3"
        }`}
        scroll={true}
      >
        {name}
        <Image
          src={srcImagePath}
          width={20}
          height={20}
          alt="type icon"
          style={{
            width: "auto",
            height: "20px",
          }}
        />
      </Link>
    </li>
  );
};
