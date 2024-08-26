const Button = ({ text, searchBookmark, click }) => {
  return (
    <button
      className={`cursor-pointer rounded-round bg-secondaryColor px-10 py-2 text-whiteColor ${searchBookmark ? "flex items-center justify-center gap-1" : "inline-block"}`}
      onClick={click ? click : null}
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
