import { useLoaderData } from "react-router-dom";
import BooksCard from "./BooksCard";
import { useEffect, useState } from "react";

const SearchView = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Track error and message visibility.
  const { books } = useLoaderData();

  // console.log("Books:", books);

  // Automatically hide the error after 4 seconds.
  useEffect(() => {
    if (error) {
      setIsVisible(true); // Show the error.

      const timer = setTimeout(() => {
        setIsVisible(false); // start fade out.
        setTimeout(() => setError(""), 500); // Clear error after fade out.
      }, 5000); // wait 3 secs before starting fade-out

      return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts.
    }

    if (message) {
      setIsVisible(true); // Show the error.

      const timer = setTimeout(() => {
        setIsVisible(false); // start fade out.
        setTimeout(() => setMessage(""), 500); // Clear error after fade out.
      }, 4000); // wait 3 secs before starting fade-out

      return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts.
    }
  }, [error, message]);

  // Simulate loading.
  useEffect(() => {
    if (books) {
      setLoading(false);
    }
  }, [books]);

  return (
    <div className="wrapper relative">
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
                <BooksCard
                  {...book}
                  imgUrl={getBookCoverUrl}
                  key={index}
                  setError={setError}
                  setMessage={setMessage}
                />
              ))}
            </ul>
          ) : (
            <p className="py-3 text-lg text-whiteColor lg:text-xl">
              No results found!
            </p>
          )}
        </>
      )}

      {error && (
        <div
          className={`fixed bottom-0 right-0 inline-block translate-x-[-16px] translate-y-[-90px] rounded-round bg-red-500 px-2 py-1 text-whiteColor ${isVisible ? "fade-in" : "fade-in-hidden"}`}
        >
          <h1 className="text-xs font-normal md:text-sm">{error}</h1>
        </div>
      )}

      {message && (
        <div
          className={`fixed bottom-0 right-0 inline-block translate-x-[-16px] translate-y-[-90px] rounded-round bg-green-500 px-2 py-1 text-whiteColor ${isVisible ? "fade-in" : "fade-in-hidden"}`}
        >
          <h1 className="text-xs font-normal md:text-sm">{message}</h1>
        </div>
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
