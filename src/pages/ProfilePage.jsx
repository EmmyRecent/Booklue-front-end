import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, useActionData } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import BookmarkCard from "../components/BookmarkCard";
import ReviewBook from "../components/ReviewBook";
import ReviewedBookCard from "../components/ReviewedBookCard";
import { BookContext } from "../context/BookContext";

const ProfilePage = () => {
  const data = useActionData();
  const body = document.querySelector("body");
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { reviewedBook, setReviewedBook } = useContext(BookContext);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showReviewBook, setShowReviewBook] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const [sortBy, setSortBy] = useState("Title");

  console.log("User books:", userBooks);

  const handleClick = () => {
    setShowEditProfile(true);
  };

  if (showEditProfile || showReviewBook) {
    body.classList.add("modal-open");
  } else {
    body.classList.remove("modal-open");
  }

  // Handle logout of user.
  const handleLogout = () => {
    console.log("logged out!");

    setIsAuthenticated(false);
  };

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  console.log("Sort by:", sortBy);

  // Updating the user data when profile has been edited.
  useEffect(() => {
    const getUser = async () => {
      console.log("Getting user");

      try {
        const result = await axios.get("http://localhost:5000/user", {
          params: { email: user.email },
        });

        console.log("Results:", result.data);

        setUser(result.data.user);
      } catch (err) {
        console.error("Error updating user:", err);
      }
    };
    getUser();
  }, [data, setUser, user.email]);

  // Get users books.
  useEffect(() => {
    const getUserBooks = async () => {
      console.log("Getting user books!");

      try {
        const result = await axios.get(
          "http://localhost:5000/api/getUserBooks",
          {
            params: { id: user.id, sort: sortBy },
          },
        );

        setUserBooks(result.data.data);
      } catch (err) {
        console.error("Error getting user books:", err);
      }
    };

    getUserBooks();
  }, [user.id, sortBy]);

  // Get users reviewed books.
  useEffect(() => {
    const getReviewedBook = async () => {
      console.log("Getting reviewed Books!");

      try {
        const result = await axios.get(
          "http://localhost:5000/api/getUserReviewedBooks",
          {
            params: { id: user.id },
          },
        );

        setReviewedBook(result.data.data);
      } catch (err) {
        console.error("Error getting user reviewed books:", err);
      }
    };

    getReviewedBook();
  }, [user.id, setReviewedBook, userBooks]);

  return (
    <section>
      <div className="wrapper">
        <div className="py-10">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-start">
            {user.profile_picture ? (
              <img
                className="rounded-[100%]"
                width={130}
                height={130}
                src={user.profile_picture}
                alt="Profile Picture"
              />
            ) : (
              <i className="bx bxs-user-circle text-[90px] text-secondaryColor lg:text-[100px]"></i>
            )}

            <div className="flex flex-col gap-1 text-whiteColor lg:gap-2">
              <h3 className="text-xl lg:text-2xl">{user.name || "Add name"}</h3>
              <p className="text-sm lg:text-lg">
                @{user.username || "Add username"}
              </p>
              <p className="text-lg lg:text-xl">{user.email}</p>

              <div
                className="mx-auto flex cursor-pointer gap-2 whitespace-nowrap rounded-round bg-lightGrayColor p-2 text-lg md:mx-0 md:mr-auto lg:text-xl"
                onClick={handleClick}
              >
                <i className="bx bx-edit text-lg"></i>
                <p>Edit profile</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-whiteColor lg:text-lg">
            {user.bio || "No bio yet"}
          </p>
        </div>

        <div className="py-7 lg:py-10">
          <div className="flex flex-col items-start justify-between gap-2 text-xl ll:flex-row ll:items-center lg:text-2xl">
            <h4 className="text-whiteColor">Books read</h4>

            <div className="flex items-center justify-center gap-2">
              <span className="text-whiteColor">Sort by:</span>

              <Form>
                <label htmlFor="Sort by"></label>

                <select name="sort" value={sortBy} onChange={handleChange}>
                  <option value="Title">Title</option>
                  <option value="Author">Author</option>
                  <option value="added_at">Date</option>
                </select>
              </Form>
            </div>
          </div>

          {/* Read books  */}
          <div className="flex min-h-[30vh] flex-col justify-center">
            {userBooks.length === 0 ? (
              <p className="justify-self-center text-center text-2xl text-lightGrayColor">
                No books read
              </p>
            ) : (
              <ul className="flex flex-col gap-4 py-8">
                {userBooks.map((book, index) => (
                  <BookmarkCard
                    {...book}
                    key={index}
                    userBooks={userBooks}
                    setUserBooks={setUserBooks}
                    setShowReviewBook={setShowReviewBook}
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-2 text-xl ll:flex-row ll:items-center lg:text-2xl">
            <h4 className="text-whiteColor">Books reviewed</h4>

            <div className="flex items-center justify-center gap-2">
              <span className="text-whiteColor">Sort by:</span>

              <Form>
                <label htmlFor="Sort by"></label>

                <select name="sort">
                  <option value="Title">Title</option>
                  <option value="Author">Author</option>
                  <option value="date">Date</option>
                  <option value="date">Rating</option>
                </select>
              </Form>
            </div>
          </div>

          {/* Reviewed books  */}
          <div className="flex min-h-[30vh] flex-col justify-center">
            {reviewedBook.length === 0 ? (
              <p className="justify-self-center text-center text-2xl text-lightGrayColor">
                No books reviewed
              </p>
            ) : (
              <ul className="grid grid-cols-1 justify-items-center gap-4 py-8 max-[480px]:place-items-center sm:grid-cols-2 lg:grid-cols-3">
                {reviewedBook.map((book, index) => (
                  <ReviewedBookCard key={index} {...book} />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`overlay pb-[20px] pt-[20px] ${showEditProfile ? "show" : ""}`}
        >
          <EditProfile close={() => setShowEditProfile(false)} />
        </div>

        <div
          className={`overlay pb-[20px] pt-[20px] ${showReviewBook ? "show" : ""}`}
        >
          <ReviewBook close={() => setShowReviewBook(false)} />
        </div>

        <div
          className="my-8 inline-block cursor-pointer rounded-round bg-secondaryColor px-4 py-2"
          onClick={handleLogout}
        >
          <p className="text-[1rem] font-medium lg:text-lg">Log out</p>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
