import React from "react";
import { useBookContext } from "../contexts/BookContext";

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useBookContext();

  return (
    <aside className="wishlist">
      <h2>My Reading Wishlist ({wishlist.length})</h2>
      <div className="wishlist-items">
        {wishlist.map((book) => (
          <div key={book.id} className="wishlist-item">
            <p>{book.volumeInfo.title}</p>
            <button
              onClick={() => removeFromWishlist(book.id)}
              aria-label={`Remove ${book.volumeInfo.title} from wishlist`}
              className="remove-button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
