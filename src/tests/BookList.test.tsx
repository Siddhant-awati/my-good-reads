import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookList } from "../components/BookList";
import { Book } from "../utils/types";
import { useBookContext } from "../contexts/BookContext";

// Mock BookContext
jest.mock("../contexts/BookContext", () => ({
  useBookContext: jest.fn(),
}));

const mockAddToWishlist = jest.fn();

const mockBook: Book = {
  id: "1",
  volumeInfo: {
    title: "Clean Code",
    authors: ["Robert C. Martin"],
    publisher: "Prentice Hall",
    publishedDate: "2008-08-01",
    description: "A Handbook of Agile Software Craftsmanship.",
    imageLinks: {
      thumbnail: "https://example.com/thumbnail.jpg",
    },
  },
};

describe("BookList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows search instruction when hasSearch is false", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList books={[]} loading={false} error={null} hasSearch={false} />
    );

    expect(
      screen.getByText(/start typing to search for books/i)
    ).toBeInTheDocument();
  });

  it("shows error message when error exists", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList
        books={[]}
        loading={false}
        error="Failed to load"
        hasSearch={true}
      />
    );

    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("shows 'No books found' when book list is empty", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList books={[]} loading={false} error={null} hasSearch={true} />
    );

    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });

  it("renders book cards when books are provided", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList
        books={[mockBook]}
        loading={false}
        error={null}
        hasSearch={true}
      />
    );

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to Wishlist" })
    ).toBeInTheDocument();
  });

  it("disables wishlist button if book is already in wishlist", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [mockBook],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList
        books={[mockBook]}
        loading={false}
        error={null}
        hasSearch={true}
      />
    );

    const button = screen.getByRole("button", { name: /added to wishlist/i });
    expect(button).toBeDisabled();
  });

  it("calls addToWishlist when button is clicked", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
    });

    render(
      <BookList
        books={[mockBook]}
        loading={false}
        error={null}
        hasSearch={true}
      />
    );

    const button = screen.getByRole("button", { name: /add to wishlist/i });
    fireEvent.click(button);

    expect(mockAddToWishlist).toHaveBeenCalledWith(mockBook);
  });
});
