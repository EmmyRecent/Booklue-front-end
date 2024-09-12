const StarRating = ({ rating, setRating }) => {
  const handleStarClick = (ratingValue) => {
    setRating(ratingValue); // Update the state with the selected rating
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <i
            key={index}
            className={`bx bxs-star cursor-pointer text-3xl ${
              ratingValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleStarClick(ratingValue)}
          ></i>
        );
      })}
    </div>
  );
};

export default StarRating;
