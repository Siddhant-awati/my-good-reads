import React from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Enter book name, e.g. Javascript"
    aria-label="Search books"
    className="search-input"
  />
);
