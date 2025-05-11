import React from "react";
import { useBookContext } from "../contexts/BookContext";
import { Book } from "../utils/types";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface BookListProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  hasSearch: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  loading,
  error,
  hasSearch,
}) => {
  const { wishlist, addToWishlist } = useBookContext();

  if (!hasSearch)
    return (
      <div className="instruction-message">
        <span role="img" aria-label="Search">
          🔍
        </span>{" "}
        Start typing to search for books (e.g. "Javascript")
      </div>
    );

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="status-message error">{error}</div>;
  if (!books.length)
    return <div className="status-message">No books found</div>;

  return (
    <>
      <div className="book-list">
        {books.map((book) => {
          const isAdded = wishlist.some((b) => b.id === book.id);
          return (
            <article key={book.id} className="book-card">
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://placehold.co/300x450/EFEFEF/666666/jpg?text=Book+Placeholder"
                }
                alt={`Cover of ${book.volumeInfo.title}`}
                className="book-cover"
                loading="lazy"
              />
              <div className="book-details">
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
                <p>{book.volumeInfo.publisher}</p>
                <p>{book.volumeInfo.publishedDate}</p>
                <p className="book-description">
                  {book.volumeInfo.description}
                </p>
                <button
                  onClick={() => addToWishlist(book)}
                  disabled={isAdded}
                  className="add-button"
                  aria-disabled={isAdded}
                >
                  {isAdded ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
