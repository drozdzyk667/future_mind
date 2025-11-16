import { validateSearchForm } from "./validateForm";

describe("validateSearchForm", () => {
  it("returns error when year is invalid (not 4 digits)", () => {
    const result = validateSearchForm({
      year: "22",
    });

    expect(result.year).toBe("Year must be a 4-digit number (e.g. 1999).");
  });

  it("returns error when year contains letters", () => {
    const result = validateSearchForm({
      year: "20a3",
    });

    expect(result.year).toBe("Year must be a 4-digit number (e.g. 1999).");
  });
});
