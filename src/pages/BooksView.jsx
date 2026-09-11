import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import * as bookShelfAPI from "../services/bookshelf-api";
import PageHeading from "../components/PageHeading";
import Filter from "@/components/Filter";

export default function BooksView() {
  const [books, setBooks] = useState([]);
  const controller = useRef(null);

  useEffect(() => {
    bookShelfAPI.fetchBooks().then(setBooks);
  }, []);

  return (
    <>
      <PageHeading text="Книги" />

      <Filter />

      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Oopps something was wrong</p>
      )}
    </>
  );
}
