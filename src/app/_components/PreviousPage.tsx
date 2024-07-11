"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function PreviousPage() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={router.back}
      className="flex justify-center items-center gap-2 bg-black/10 rounded-lg p-2 px-3"
    >
      <Image
        src="/icons/arrow.png"
        width={20}
        height={20}
        alt="yuh"
        className=""
      />
      {"Back"}
    </button>
  );
}
