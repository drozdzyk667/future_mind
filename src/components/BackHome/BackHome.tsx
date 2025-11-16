"use client";

export const BackHome = () => {
  return (
    <button
      className="m-6 p-3 rounded-lg cursor-pointer border-2 border-amber-500"
      onClick={() => window.location.replace("/")}
    >
      Back home
    </button>
  );
};
