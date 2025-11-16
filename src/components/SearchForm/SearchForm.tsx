"use client";

import { useUI } from "@/lib/UITransitionContext";
import { validateSearchForm } from "@/helpers/validators/validateForm";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { searchInitialValues } from "@/helpers/constants/constants";

export const SearchForm = () => {
  const router = useRouter();

  const [query, setQuery] = useState(searchInitialValues.query);
  const [year, setYear] = useState(searchInitialValues.year);
  const [type, setType] = useState(searchInitialValues.type);

  const [errors, setErrors] = useState<{ query?: string; year?: string }>({});

  const { isPending, startTransition } = useUI();

  const updateURL = () => {
    const params = new URLSearchParams();

    if (query) params.set("query", query);
    if (year) params.set("year", year);
    if (type) params.set("type", type);

    startTransition(() => {
      router.push(`/movies?${params.toString()}`);
    });
  };

  const isDisabled = isPending || !query.trim();

  const handleResetValues = () => {
    setQuery(searchInitialValues.query);
    setYear(searchInitialValues.year);
    setType(searchInitialValues.type);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    const validationErrors = validateSearchForm({
      query,
      year,
      type,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleResetValues();
    updateURL();
  };

  return (
    <>
      {isPending && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <span className="text-gray-300 text-sm animate-pulse">
            Loading results…
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`
          bg-[#111] border border-gray-700 p-5 rounded-lg 
          transition-opacity duration-200
          ${isPending ? "opacity-60" : "opacity-100"}
        `}
      >
        <input
          className="w-full border border-gray-600 bg-[#0d0d0d] text-gray-200 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search movies..."
          disabled={isPending}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex gap-4 mt-4 flex-wrap">
          <input
            className="w-32 border border-gray-600 bg-[#0d0d0d] text-gray-200 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Year"
            disabled={isPending}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="relative">
            <select
              className=" cursor-pointer appearance-none border border-gray-600 bg-[#0d0d0d] text-gray-200 px-3 py-2 pr-10 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isPending}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All types</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {errors.query ||
          (errors.year && (
            <ErrorMessage message={errors.query || errors.year} />
          ))}

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full mt-4 py-2 rounded-md text-white transition text-center
            ${
              isDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 cursor-pointer"
            }
          `}
        >
          {isPending ? "Loading…" : "Search"}
        </button>
      </form>
    </>
  );
};
