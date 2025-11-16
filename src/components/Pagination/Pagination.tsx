"use client";

import { useUI } from "@/lib/UITransitionContext";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  isPending: boolean;
  onChangePage: (page: number, callback: () => void) => void;
};

export const Pagination = ({
  onChangePage,
  totalPages,
  currentPage,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPending, startTransition } = useUI();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      onChangePage(page, () => router.push(`/movies?${params.toString()}`));

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <nav
      aria-label="Movies pagination"
      className="flex items-center gap-4 justify-center my-6"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
        className="cursor-pointer px-4 py-2 bg-[#1f1f23] text-white rounded disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-white">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages || isPending}
        className="cursor-pointer px-4 py-2 bg-[#1f1f23] text-white rounded disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};
