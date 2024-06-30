"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface pokemonType {
  name: string;
  url: string;
}

interface NavigationListProps {
  pokemonTypes: pokemonType[];
}

export default function NavigationList({ pokemonTypes }: NavigationListProps) {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState("normal");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedRoute(selectedValue);
    router.push("/" + selectedValue);
  };

  return (
    <select value={selectedRoute} onChange={handleSelectChange}>
      {pokemonTypes.map((info: pokemonType) => {
        return (
          <option value={info.name} key={info.name}>
            {info.name}
          </option>
        );
      })}
    </select>
  );
}
