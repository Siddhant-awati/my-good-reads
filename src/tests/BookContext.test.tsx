import React from "react";
import { render, screen } from "@testing-library/react";
import { BookProvider, useBookContext } from "../contexts/BookContext";
import userEvent from "@testing-library/user-event";

const mockBook = {
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
};

const ConsumerComponent = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useBookContext();

  return (
    <div>
      <div data-testid="wishlist-count">{wishlist.length}</div>
      <button onClick={() => addToWishlist(mockBook)}>Add</button>
      <button onClick={() => removeFromWishlist(mockBook.id)}>Remove</button>
      {wishlist.map((book) => (
        <div key={book.id}>{book.volumeInfo.title}</div>
      ))}
    </div>
  );
};

describe("BookContext", () => {
  it("adds a book to the wishlist", async () => {
    render(
      <BookProvider>
        <ConsumerComponent />
      </BookProvider>
    );

    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("0");

    await userEvent.click(screen.getByText("Add"));

    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
  });

  it("does not add the same book twice", async () => {
    render(
      <BookProvider>
        <ConsumerComponent />
      </BookProvider>
    );

    const addButton = screen.getByText("Add");
    await userEvent.click(addButton);
    await userEvent.click(addButton);

    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
  });

  it("removes a book from the wishlist", async () => {
    render(
      <BookProvider>
        <ConsumerComponent />
      </BookProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");

    await userEvent.click(screen.getByText("Remove"));
    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("0");
  });
});
