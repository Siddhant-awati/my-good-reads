import React from "react";

export const LoadingSkeleton = () => {
  return (
    <div className="book-list">
      {[1, 2, 3].map((i) => (
        <div key={i} className="book-card skeleton">
          <div className="book-cover skeleton" />
          <div className="book-details">
            <div className="skeleton-line" style={{ width: "80%" }} />
            <div className="skeleton-line" style={{ width: "60%" }} />
            <div className="skeleton-line" style={{ width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
};
