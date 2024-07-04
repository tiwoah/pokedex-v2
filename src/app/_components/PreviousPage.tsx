"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function PreviousPage() {
  const router = useRouter();
  return (
    <button type="button" onClick={router.back}>
      {"< Back"}
    </button>
  );
}
