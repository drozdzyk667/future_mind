import { ITEMS_PER_PAGE } from "@/helpers/constants/constants";

export const MoviesSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center mt-6">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <div key={i} className="w-56 animate-pulse">
          <div className="h-80 bg-gray-700 rounded-md mb-3" />
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
};
