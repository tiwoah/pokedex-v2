"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex justify-center items-center gap-3 bg-black/20 dark:bg-white/20 outline outline-1 outline-black/30 dark:outline-white/30 rounded-full px-2">
        <button className="flex justify-center items-center">
          <Image
            src="/icons/sun.png"
            width={20}
            height={20}
            alt="sun"
            className={`z-10 transition-all duration-500 invert opacity-40`}
          />
        </button>
        <button className="flex justify-center items-center">
          <Image
            src="/icons/moon.png"
            width={20}
            height={20}
            alt="moon"
            className={`z-10 transition-all duration-500 invert opacity-40`}
          />
        </button>
        <button className="flex justify-center items-center">
          <Image
            src="/icons/system.png"
            width={20}
            height={20}
            alt="system"
            className={`z-10 transition-all duration-500 invert opacity-40`}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center gap-3 bg-black/20 dark:bg-white/20 outline outline-1 outline-black/30 dark:outline-white/30 rounded-full px-2">
      <div
        className={`rounded-full bg-white h-[80%] aspect-square absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${theme === "light" ? "left-1" : theme === "dark" ? "left-[2.2rem]" : "left-[4.2rem]"}`}
      ></div>
      <button
        className="flex justify-center items-center"
        onClick={() => {
          setTheme("light");
        }}
      >
        <Image
          src="/icons/sun.png"
          width={20}
          height={20}
          alt="sun"
          className={`z-10 transition-all duration-500 ${theme === "light" ? "" : "invert opacity-40"}`}
        />
      </button>
      <button
        className="flex justify-center items-center"
        onClick={() => {
          setTheme("dark");
        }}
      >
        <Image
          src="/icons/moon.png"
          width={20}
          height={20}
          alt="moon"
          className={`z-10 transition-all duration-500 ${theme === "dark" ? "" : "invert opacity-40"}`}
        />
      </button>
      <button
        className="flex justify-center items-center"
        onClick={() => {
          setTheme("system");
        }}
      >
        <Image
          src="/icons/system.png"
          width={20}
          height={20}
          alt="system"
          className={`z-10 transition-all duration-500 ${theme === "system" ? "" : "invert opacity-40"}`}
        />
      </button>
    </div>
  );
}
