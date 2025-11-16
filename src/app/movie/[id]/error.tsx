"use client";

import { BackHome } from "@/components/BackHome/BackHome";
import { TryAgain } from "@/components/TryAgain/TryAgain";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="p-6">
      <p>An error occurred: {error.message}</p>
      <TryAgain reset={reset} />
      <BackHome />
    </div>
  );
}
