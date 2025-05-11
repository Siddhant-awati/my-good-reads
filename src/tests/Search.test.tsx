import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../components/Search";

describe("Search", () => {
  it("renders the input with the correct value", () => {
    render(<Search value="React" onChange={() => {}} />);
    const input = screen.getByLabelText("Search books") as HTMLInputElement;
    expect(input.value).toBe("React");
  });

  it("calls onChange with the new value when typed into", () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Search books");
    fireEvent.change(input, { target: { value: "JavaScript" } });

    expect(handleChange).toHaveBeenCalledWith("JavaScript");
  });

  it("has the correct placeholder", () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/enter book name/i)).toBeInTheDocument();
  });
});
