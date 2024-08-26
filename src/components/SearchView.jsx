import { useLoaderData } from "react-router-dom";
import BooksCard from "./BooksCard";
import { useEffect, useState } from "react";

const SearchView = () => {
  const [loading, setLoading] = useState(true);
  const { books } = useLoaderData();

  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  }, [books]);

  return (
    <div className="wrapper">
      <h1 className="py-3 text-lg text-whiteColor lg:text-xl">
        Showing results for:{" "}
        <span className="font-medium text-secondaryColor">
          {books.q || "No query"}
        </span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {books.docs.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4">
              {books.docs.map((book, index) => (
                <BooksCard {...book} imgUrl={getBookCoverUrl} key={index} />
              ))}
            </ul>
          ) : (
            <p className="py-3 text-lg text-whiteColor lg:text-xl">
              No results found!
            </p>
          )}
        </>
      )}
    </div>
  );
};

const getBookCoverUrl = (book) => {
  if (book.isbn && book.isbn.length > 0) {
    return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
  } else if (book.cover_edition_key) {
    return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
  } else if (book.olid && book.olid.length > 0) {
    return `https://covers.openlibrary.org/b/olid/${book.olid[0]}-M.jpg`;
  }
  // fallback to a placeholder image if no cover is available
  return "https://via.placeholder.com/150x200.png?text=No+Cover";
};

export default SearchView;
