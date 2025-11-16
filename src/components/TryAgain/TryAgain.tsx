"use client";

type TryAgainProps = {
  reset: () => void;
};

export const TryAgain = ({ reset }: TryAgainProps) => {
  return (
    <button
      className="m-6 p-3 rounded-lg cursor-pointer border-2 border-amber-500"
      onClick={reset}
    >
      Try again
    </button>
  );
};
