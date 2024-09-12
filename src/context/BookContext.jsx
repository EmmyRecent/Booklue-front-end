import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [reviewBook, setReviewBook] = useState([]);

  return (
    <BookContext.Provider
      value={{ books, setBooks, reviewBook, setReviewBook }}
    >
      {children}
    </BookContext.Provider>
  );
};
