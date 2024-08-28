import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, useActionData } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import axios from "axios";

const ProfilePage = () => {
  const data = useActionData();
  const body = document.querySelector("body");
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleClick = () => {
    setShowEditProfile(true);
  };

  if (showEditProfile) {
    body.classList.add("modal-open");
  } else {
    body.classList.remove("modal-open");
  }

  // Handle logout of user.
  const handleLogout = () => {
    console.log("logged out!");

    setIsAuthenticated(false);
  };

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

  return (
    <section>
      <div className="wrapper">
        <div className="py-10">
          <div className="flex items-center gap-4">
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
                className="mr-auto flex cursor-pointer gap-2 whitespace-nowrap rounded-round bg-lightGrayColor p-2 text-lg lg:text-xl"
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
          <div className="flex items-center justify-between text-xl lg:text-2xl">
            <h4 className="text-whiteColor">Books read</h4>

            <div className="flex items-center justify-center gap-2">
              <span className="text-whiteColor">Sort by:</span>

              <Form>
                <label htmlFor="Sort by"></label>

                <select name="sort">
                  <option value="Title">Title</option>
                  <option value="Author">Author</option>
                  <option value="date">Date</option>
                </select>
              </Form>
            </div>
          </div>

          {/* Read books should be displayed here */}
          <div className="min-h-[30vh]"></div>

          <div className="flex items-center justify-between text-xl lg:text-2xl">
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

          {/* Reviewed books should be displayed here */}
          <div className="min-h-[30vh]"></div>
        </div>

        {/* Overlay */}
        <div
          className={`overlay pb-[20px] pt-[20px] ${showEditProfile ? "show" : ""}`}
        >
          <EditProfile close={() => setShowEditProfile(false)} />
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
