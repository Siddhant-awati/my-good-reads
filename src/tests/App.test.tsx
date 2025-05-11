import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// Mock hooks and context
jest.mock("../hooks/useDebounce", () => ({
  useDebounce: jest.fn(),
}));

jest.mock("../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

jest.mock("../components/Wishlist", () => ({
  Wishlist: () => <div data-testid="wishlist">Mock Wishlist</div>,
}));

jest.mock("../components/BookList", () => ({
  BookList: ({ books, loading, error, hasSearch }: any) => (
    <div data-testid="booklist">
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {hasSearch && books.length > 0 && (
        <span>{books[0].volumeInfo.title}</span>
      )}
    </div>
  ),
}));

jest.mock("../components/Search", () => ({
  Search: ({ value, onChange }: any) => (
    <input
      aria-label="Search books"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  ),
}));

const mockBooks = [
  {
    id: "1",
    volumeInfo: {
      title: "Clean Code",
      authors: ["Robert C. Martin"],
      publisher: "Prentice Hall",
      publishedDate: "2008",
      description: "A Handbook of Agile Software Craftsmanship.",
      imageLinks: {
        thumbnail: "https://example.com/thumb.jpg",
      },
    },
  },
];

const mockUseDebounce = require("../hooks/useDebounce").useDebounce;
const mockUseFetch = require("../hooks/useFetch").useFetch;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header and Search input", () => {
    mockUseDebounce.mockReturnValue("");
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });

    render(<App />);

    expect(screen.getByText("My Reading Wishlist")).toBeInTheDocument();
    expect(screen.getByLabelText("Search books")).toBeInTheDocument();
  });

  it("does not fetch when search text is empty", () => {
    mockUseDebounce.mockReturnValue("");
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });

    render(<App />);
    expect(screen.getByTestId("booklist")).toBeInTheDocument();
    expect(screen.queryByText("Clean Code")).not.toBeInTheDocument();
  });

  it("triggers search and renders results", async () => {
    mockUseDebounce.mockReturnValue("Clean Code");
    mockUseFetch.mockReturnValue({
      data: { items: mockBooks },
      loading: false,
      error: null,
    });

    render(<App />);
    expect(await screen.findByText("Clean Code")).toBeInTheDocument();
  });

  it("shows loading indicator", () => {
    mockUseDebounce.mockReturnValue("Clean Code");
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", () => {
    mockUseDebounce.mockReturnValue("React");
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Fetch error",
    });

    render(<App />);
    expect(screen.getByText("Fetch error")).toBeInTheDocument();
  });

  it("allows typing in the search input", () => {
    mockUseDebounce.mockReturnValue("");
    mockUseFetch.mockReturnValue({ data: null, loading: false, error: null });

    render(<App />);
    const input = screen.getByLabelText("Search books");
    fireEvent.change(input, { target: { value: "React" } });

    expect(input).toHaveValue("React");
  });
});
