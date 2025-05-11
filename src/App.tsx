import React, { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { BookProvider } from "./contexts/BookContext";
import { Search } from "./components/Search";
import { BookList } from "./components/BookList";
import { Wishlist } from "./components/Wishlist";
import "./App.css";
import { Book } from "./utils/types";

const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const apiUrl = debouncedSearch
    ? `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        debouncedSearch
      )}`
    : "";

  const { data, loading, error } = useFetch<{ items: Book[] }>(apiUrl);
  const books = data?.items || [];

  return (
    <BookProvider>
      <div className="app">
        <header>
          <h1>My Reading Wishlist</h1>
          <Search value={searchText} onChange={setSearchText} />
        </header>

        <main className="main-content">
          <BookList
            books={books}
            loading={loading}
            error={error}
            hasSearch={!!debouncedSearch}
          />
          <Wishlist />
        </main>
      </div>
    </BookProvider>
  );
};

export default App;
