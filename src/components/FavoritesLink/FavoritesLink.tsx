import Link from "next/link";

export const FavoritesLink = () => {
  return (
    <Link href="/favorites">
      <div className="p-2">
        <button className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          Go to Favorites →
        </button>
      </div>
    </Link>
  );
};
