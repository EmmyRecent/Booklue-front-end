import Button from "./Button";

const BooksCard = ({
  title,
  author_name,
  publish_year,
  language,
  isbn,
  cover_edition_key,
  olid,
  imgUrl,
}) => {
  // Use the imgUrl function to generate the cover URL
  const coverUrl = imgUrl({ isbn, cover_edition_key, olid });

  return (
    <div className="border-secondaryColor rounded-round w-full place-self-center border p-4 shadow-xl">
      <li className="ll:flex gap-2">
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
            <p className="book-content">
              <span className="book-text">Publish year:</span>{" "}
              {publish_year ? publish_year.join(", ") : "No publish year"}
            </p>
            <p className="book-content mb-4">
              <span className="book-text">Language:</span>{" "}
              {language ? language.join(", ") : "eng"}
            </p>
          </div>

          <Button text={"Add to read"} searchBookmark={true} />
        </div>
      </li>
    </div>
  );
};

export default BooksCard;
