import { NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/omdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idsParam = searchParams.get("ids");

  if (!idsParam) return NextResponse.json([]);

  const ids = idsParam.split(",");

  const movies = await Promise.all(
    ids.map(async (id) => {
      try {
        return await getMovieDetails(id);
      } catch {
        return null;
      }
    })
  );

  return NextResponse.json(movies.filter(Boolean));
}
