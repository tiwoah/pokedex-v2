"use client";
import React, { useEffect, useState } from "react";

interface StatsBarProps {
  baseStat: number;
}

export default function StatsBar({ baseStat }: StatsBarProps) {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    setWidth(`${(baseStat / 200) * 100}%`);
  }, [baseStat]);

  return (
    <div className="relative w-full h-2 bg-black/15 rounded-full overflow-hidden">
      <div
        style={{
          width: width,
        }}
        className={`absolute inset-0 transition-all duration-500 bg-black/40 rounded-full`}
      ></div>
    </div>
  );
}
