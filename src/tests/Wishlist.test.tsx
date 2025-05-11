import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Wishlist } from "../components/Wishlist";
import { useBookContext } from "../contexts/BookContext";
import { Book } from "../utils/types";

// Mock the context
jest.mock("../contexts/BookContext", () => ({
  useBookContext: jest.fn(),
}));

const mockRemoveFromWishlist = jest.fn();

const mockWishlist: Book[] = [
  {
    id: "1",
    volumeInfo: {
      title: "The Pragmatic Programmer",
      authors: ["Andy Hunt", "Dave Thomas"],
      publisher: "Addison-Wesley",
      publishedDate: "1999-10-30",
      description: "A practical guide to programming.",
      imageLinks: {
        thumbnail: "https://example.com/image.jpg",
      },
    },
  },
  {
    id: "2",
    volumeInfo: {
      title: "Refactoring",
      authors: ["Martin Fowler"],
      publisher: "Addison-Wesley",
      publishedDate: "1999-07-08",
      description: "Improving the design of existing code.",
      imageLinks: {
        thumbnail: "https://example.com/image2.jpg",
      },
    },
  },
];

describe("Wishlist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: mockWishlist,
      removeFromWishlist: mockRemoveFromWishlist,
    });
  });

  it("renders the wishlist header with count", () => {
    render(<Wishlist />);
    expect(screen.getByText(/my reading wishlist \(2\)/i)).toBeInTheDocument();
  });

  it("renders all wishlist items", () => {
    render(<Wishlist />);
    expect(screen.getByText("The Pragmatic Programmer")).toBeInTheDocument();
    expect(screen.getByText("Refactoring")).toBeInTheDocument();
  });

  it("calls removeFromWishlist when remove button is clicked", () => {
    render(<Wishlist />);
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFromWishlist).toHaveBeenCalledWith("1");
  });

  it("renders nothing when wishlist is empty", () => {
    (useBookContext as jest.Mock).mockReturnValue({
      wishlist: [],
      removeFromWishlist: mockRemoveFromWishlist,
    });

    render(<Wishlist />);
    expect(screen.getByText(/my reading wishlist \(0\)/i)).toBeInTheDocument();
    expect(
      screen.queryByText("The Pragmatic Programmer")
    ).not.toBeInTheDocument();
  });
});
