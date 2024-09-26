import { useContext } from "react";
import Button from "./Button";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { apiUrl } from "../constants";

const BooksCard = ({
  title,
  author_name,
  // publish_year,
  language,
  isbn,
  cover_edition_key,
  olid,
  imgUrl,
  setError,
  setMessage,
}) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  // Use the imgUrl function to generate the cover URL
  const coverUrl = imgUrl({ isbn, cover_edition_key, olid });

  const handleBookmark = async () => {
    const data = {
      title: title,
      author: author_name.join(", "),
      language: language.join(", "),
      cover: coverUrl,
    };

    if (isAuthenticated) {
      try {
        const response = await axios.post(`${apiUrl}/api/addBookmark`, data);

        if (response.status === 200) {
          const { id: bookId } = response.data.data; // Extract the new book's Id.

          const userBookData = {
            user_id: user.id, // User id Available from the user context.
            book_id: bookId,
            rating: 4, // Default rating.
            notes: "", // Default / initial note.
            read_date: new Date().toISOString().split("T")[0], // Default / current date.
            visibility: true, // Default visibility.
          };

          // Add books to user's reading list.
          await axios.post(`${apiUrl}/api/userBooks`, userBookData);

          setMessage(response.data.message);
        }
      } catch (err) {
        console.log("Error adding books", err);
      }
    } else {
      setError("Cannot add to bookmark, please login to your account!"); // error message if user is not logged in.
    }
  };

  return (
    <div className="w-full place-self-center rounded-round border border-secondaryColor p-4 shadow-xl">
      <li className="gap-2 ll:flex">
        <img src={coverUrl} alt={title} className="w-[150px]" />

        <div>
          <div>
            <h3 className="book-content">
              <span className="book-text">Book title:</span> {title}
            </h3>
            <p className="book-content">
              <span className="book-text">Author:</span>{" "}
              {author_name ? author_name.join(", ") : "Unknown Author"}
            </p>
            {/* <p className="book-content">
              <span className="book-text">Publish year:</span>{" "}
              {publish_year ? publish_year.join(", ") : "No publish year"}
            </p> */}
            <p className="book-content mb-4">
              <span className="book-text">Language:</span>{" "}
              {language ? language.join(", ") : "eng"}
            </p>
          </div>

          <Button
            text={"Add to read"}
            searchBookmark={true}
            bookmark={handleBookmark}
          />
        </div>
      </li>
    </div>
  );
};

export default BooksCard;
