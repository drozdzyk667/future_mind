import { renderHook, act } from "@testing-library/react";
import { useFavoritesState } from "./useFavoritesState";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useFavoritesState", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("initializes from localStorage", () => {
    window.localStorage.setItem("favorites", JSON.stringify(["1", "2"]));

    const { result } = renderHook(() => useFavoritesState());

    expect(result.current.favorites).toEqual(["1", "2"]);
  });

  it("adds a favorite", () => {
    const { result } = renderHook(() => useFavoritesState());

    act(() => result.current.toggleFavorite("3"));

    expect(result.current.favorites).toEqual(["3"]);
    expect(JSON.parse(localStorage.getItem("favorites")!)).toEqual(["3"]);
  });

  it("removes a favorite", () => {
    window.localStorage.setItem("favorites", JSON.stringify(["1"]));

    const { result } = renderHook(() => useFavoritesState());

    act(() => result.current.toggleFavorite("1"));

    expect(result.current.favorites).toEqual([]);
  });

  it("prevents duplicates", () => {
    const { result } = renderHook(() => useFavoritesState());

    act(() => result.current.toggleFavorite("10"));
    act(() => result.current.toggleFavorite("10"));

    expect(result.current.favorites).toEqual([]);
  });
});
