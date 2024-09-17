import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewPostDetails = () => {
  const { userId, bookId } = useParams();
  const [bookDetails, setBookDetails] = useState([]);

  console.log("Param User id:", userId);
  console.log("Param Book id:", bookId);
  console.log(bookDetails);

  // const dateString = bookDetails.read_date;
  // const date = new Date(dateString).toISOString().split("T")[0]; // This will give you "2024-09-04"

  // console.log(date); // Output: "2024-09-04"

  const dateString = bookDetails?.read_date;

  // check if date string is valid.
  let formattedDate = "N/A";

  if (dateString) {
    const date = new Date(dateString);

    if (!isNaN(date)) {
      formattedDate = date.toISOString().split("T")[0]; //Format the valid date.
    } else {
      console.error("Invalid date format:", dateString);
    }
  } else {
    console.error("No read_date available");
  }

  console.log("Formatted date:", formattedDate);

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

  useEffect(() => {
    const getReviewPostsDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getReviewPostsDetails",
          {
            params: { userId, bookId },
          },
        );

        setBookDetails(response.data.data);
      } catch (err) {
        console.error("Error getting post details:", err);
      }
    };

    getReviewPostsDetails();
  }, [bookId, userId]);

  return (
    <div className="wrapper my-10">
      <h2 className="py-6 text-2xl font-medium text-whiteColor lg:text-3xl">
        Book Details
      </h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <img
          src={bookDetails.cover_image}
          alt={bookDetails.title}
          className="w-full lg:max-w-[300px]"
        />

        <div className="flex w-full flex-col gap-4 rounded-round border border-secondaryColor p-3">
          <div className="mr-auto flex w-auto cursor-pointer items-center gap-2 rounded-round bg-grayColor px-3 py-2">
            <img
              src={bookDetails.profile_picture}
              alt="profile picture"
              className="w-full max-w-[50px] rounded-full"
            />
            <p className="text-whiteColor">{bookDetails.name}</p>
          </div>

          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Book title:{" "}
            <span className="font-normal text-whiteColor">
              {bookDetails.title}
            </span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Author:{" "}
            <span className="font-normal text-whiteColor">
              {bookDetails.author}
            </span>
          </h4>
          <h4 className="flex flex-col gap-2 text-lg font-medium text-secondaryColor sm:flex-row md:text-xl">
            User&apos;s Rating:{" "}
            <span className="flex gap-1">
              {renderStars(bookDetails.rating)}
            </span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            Date Read:{" "}
            <span className="font-normal text-whiteColor">{formattedDate}</span>
          </h4>
          <h4 className="text-lg font-medium text-secondaryColor md:text-xl">
            User&apos;s Notes:{" "}
            <span className="font-normal text-whiteColor">
              {bookDetails.notes}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ReviewPostDetails;
