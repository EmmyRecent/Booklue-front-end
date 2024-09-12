const Button = ({
  text,
  searchBookmark,
  click,
  bookmark,
  review,
  reviewSave,
}) => {
  return (
    <button
      className={`cursor-pointer rounded-round bg-secondaryColor ${review ? "px-3" : "px-10"} py-2 text-whiteColor ${searchBookmark ? "flex items-center justify-center gap-1" : "inline-block"}`}
      onClick={() => {
        if (click) click();
        if (bookmark) bookmark();
        if (review) review();
        if (reviewSave) reviewSave();
      }}
    >
      {searchBookmark && (
        <div>
          <i className="bx bxs-bookmark-star text-lg"></i>
        </div>
      )}
      <p className="text-[1rem] font-medium lg:text-lg">{text}</p>
    </button>
  );
};

export default Button;
