import { validateSearchForm } from "./validateForm";

describe("validateSearchForm", () => {
  it("returns error when query is empty", () => {
    const result = validateSearchForm({
      query: "",
      year: "",
      type: "",
    });

    expect(result.query).toBe("Search query cannot be empty.");
  });

  it("trims spaces and still returns error for empty query", () => {
    const result = validateSearchForm({
      query: "   ",
      year: "",
      type: "",
    });

    expect(result.query).toBe("Search query cannot be empty.");
  });

  it("returns error when year is invalid (not 4 digits)", () => {
    const result = validateSearchForm({
      query: "batman",
      year: "22",
      type: "",
    });

    expect(result.year).toBe("Year must be a 4-digit number (e.g. 1999).");
  });

  it("returns error when year contains letters", () => {
    const result = validateSearchForm({
      query: "batman",
      year: "20a3",
      type: "",
    });

    expect(result.year).toBe("Year must be a 4-digit number (e.g. 1999).");
  });

  it("returns no errors for valid input", () => {
    const result = validateSearchForm({
      query: "matrix",
      year: "1999",
      type: "movie",
    });

    expect(result).toEqual({});
  });

  it("allows empty year", () => {
    const result = validateSearchForm({
      query: "lotr",
      year: "",
      type: "",
    });

    expect(result).toEqual({});
  });
});
