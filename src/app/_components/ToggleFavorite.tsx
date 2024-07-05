"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  addFavorite,
  checkIsFavorited,
  removeFavorite,
} from "../_lib/handleFavorites";

interface ToggleFavoriteProps {
  id: string;
  name: string;
  url: string;
}

export default function ToggleFavorite({ id, name, url }: ToggleFavoriteProps) {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorited(checkIsFavorited(id));
  }, []);

  const handleAddFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isFavorited) {
      removeFavorite(id);
      setIsFavorited(false);
    } else {
      addFavorite(id, name, url);
      setIsFavorited(true);
    }
  };

  return (
    <button onClick={handleAddFavorite}>
      {isFavorited ? (
        <Image src="/icons/star_filled.png" width={30} height={30} alt="yuh" />
      ) : (
        <Image src="/icons/star.png" width={30} height={30} alt="yuh" />
      )}
    </button>
  );
}
