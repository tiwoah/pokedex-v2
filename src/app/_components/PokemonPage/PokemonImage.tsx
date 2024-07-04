"use client";
import React, { useState } from "react";
import Image from "next/image";

interface PokemonImageProps {
  normalImageUrl: string;
  shinyImageUrl: string;
  name: string;
}

export default function PokemonImage({
  normalImageUrl,
  shinyImageUrl,
  name,
}: PokemonImageProps) {
  const [displayImage, setDisplayImage] = useState("normal");

  return (
    <>
      <div className="bg-black/5 rounded-3xl mt-4">
        <Image
          src={displayImage === "normal" ? normalImageUrl : shinyImageUrl}
          width={300}
          height={300}
          alt={`Pokemon sprite: ` + name}
          sizes="300px"
          priority={true}
        />
      </div>
      <div className="w-full flex gap-2 justify-center py-2 drop-shadow-xl">
        <button
          className={`p-2 px-4 subtitle-p bg-black/10 rounded-full outline outline-2 transition-all duration-200 ${
            displayImage === "normal" ? "outline-black/100" : "outline-black/0"
          }`}
          onClick={() => setDisplayImage("normal")}
        >
          Default
        </button>
        <button
          className={`p-2 px-4 subtitle-p bg-black/10 rounded-full outline outline-2 transition-all duration-200 ${
            displayImage === "shiny" ? "outline-black/100" : "outline-black/0"
          }`}
          onClick={() => setDisplayImage("shiny")}
        >
          Shiny
        </button>
      </div>
    </>
  );
}
