import { MovieSearchParams } from "@/helpers/types/types";
import { redirect } from "next/navigation";

const redirectWithPage = (
  page: number,
  params: MovieSearchParams | undefined
) => {
  const newParams = new URLSearchParams(params);
  newParams.set("page", page.toString());
  redirect(`/movies?${newParams.toString()}`);
};

export const validateInitialPage = (
  page: string | undefined,
  params: MovieSearchParams | undefined
) => {
  if (!page) return 1;

  const num = Number(page);

  if (!Number.isInteger(num)) {
    return redirectWithPage(1, params);
  }

  if (num < 1) {
    return redirectWithPage(1, params);
  }

  if (num > 10000) {
    return redirectWithPage(1, params);
  }

  return num;
};

export const clampPageToTotal = (
  currentPage: number,
  totalPages: number,
  params: MovieSearchParams | undefined
) => {
  if (currentPage > totalPages) {
    return redirectWithPage(totalPages, params);
  }

  return currentPage;
};
