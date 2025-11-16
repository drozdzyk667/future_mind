"use client";

import { useRouter } from "next/navigation";

export const ReturnButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
    >
      ← Back
    </button>
  );
};
