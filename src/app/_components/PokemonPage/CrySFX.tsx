"use client";
import React, { useRef, ReactNode } from "react";

interface CrySFXProps {
  children: ReactNode;
  source: string;
}

export default function CrySFX({ children, source }: CrySFXProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio is playing");
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    }
  };

  return (
    <div>
      <button
        onClick={play}
        className="p-2 px-4 subtitle-p bg-black/10 rounded-full"
      >
        {children}
      </button>
      <audio ref={audioRef} src={source} />
    </div>
  );
}
