import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the error message text", () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("applies the correct styling classes", () => {
    render(<ErrorMessage message="Error!" />);

    const p = screen.getByText("Error!");

    expect(p).toHaveClass("text-red-500");
    expect(p).toHaveClass("text-sm");
    expect(p).toHaveClass("mt-1");
  });
});
