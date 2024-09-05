import Button from "./Button";

const BookmarkCard = ({ title, author, language, cover_image }) => {
  const handleBookReview = () => {
    console.log("Book review was clicked!");
  };

  return (
    <div className="w-full rounded-round bg-grayColor p-3 shadow-xl">
      <li className="flex items-center justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
          <img
            src={cover_image}
            alt={title}
            className="w-[90px] lg:w-[100px]"
          />

          <div className="text-whiteColor">
            <h3 className="text-lg font-medium lg:text-xl">
              <span>{title}</span>
            </h3>
            <p className="text-sm text-secondaryColor lg:text-lg">
              <span>{author}</span>
            </p>
            <p className="text-sm text-whiteColor lg:text-lg">
              <span>{language}</span>
            </p>

            <Button text={"Review this book"} review={handleBookReview} />
          </div>
        </div>

        {/* Icon */}
        <i className="bx bxs-bookmark text-3xl text-secondaryColor lg:text-[2rem]"></i>
      </li>
    </div>
  );
};

export default BookmarkCard;
