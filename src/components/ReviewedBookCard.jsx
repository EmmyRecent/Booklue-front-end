const ReviewedBookCard = ({
  // id,
  cover_image,
  author,
  name,
  notes,
  profile_picture,
  rating,
  read_date,
  title,
}) => {
  const dateString = read_date;
  const dateOnly = new Date(dateString).toISOString().split("T")[0];

  // A function to generate star icons based on the rating.
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars; // Remaining stars.

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="bx bxs-star text-xl text-yellow-500"></i>,
      );
    }

    // Add empty stars.
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="bx bx-star text-xl text-gray-400"></i>,
      );
    }

    return stars;
  };

  return (
    <div className="w-full max-w-[300px] rounded-round border border-secondaryColor p-3 shadow-xl">
      <li className="flex flex-col gap-4">
        <img src={cover_image} alt={title} className="w-full" />

        <div className="flex flex-col gap-2">
          {/* Profile */}
          <div className="mr-auto flex w-auto cursor-pointer items-center gap-2 rounded-round bg-grayColor px-3 py-2">
            <img
              src={profile_picture}
              alt="profile picture"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="text-whiteColor">{name}</p>
          </div>

          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Book title:{" "}
            <span className="font-normal text-whiteColor">{title}</span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Author:{" "}
            <span className="font-normal text-whiteColor">{author}</span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            User&apos;s Rating:{" "}
            {/* <span className="font-normal text-whiteColor">{rating}</span> */}
            <span className="flex gap-1">{renderStars(rating)}</span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Date Read:{" "}
            <span className="font-normal text-whiteColor">{dateOnly}</span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            User&apos;s Notes:{" "}
            <span className="font-normal text-whiteColor">{notes}</span>
          </h4>

          {/* Profile */}
          <div className="mr-auto w-auto cursor-pointer rounded-round bg-grayColor px-3 py-2 text-whiteColor hover:text-secondaryColor">
            <a href="#">Read full notes {">>"}</a>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ReviewedBookCard;
