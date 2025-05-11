import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../utils/types";

interface BookContextType {
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (id: string) => void;
}

const BookContext = createContext<BookContextType>({} as BookContextType);

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  const addToWishlist = (book: Book) => {
    setWishlist((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </BookContext.Provider>
  );
};
