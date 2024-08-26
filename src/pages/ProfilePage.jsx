import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Form, useActionData } from "react-router-dom";
import EditProfile from "../components/EditProfile";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const body = document.querySelector("body");
  const data = useActionData();

  console.log(data);

  console.log("User:", user);

  const handleClick = () => {
    setShowEditProfile(true);
  };

  if (showEditProfile) {
    body.classList.add("modal-open");
  } else {
    body.classList.remove("modal-open");
  }

  return (
    <section>
      <div className="wrapper">
        <div className="py-10">
          <div className="flex items-center gap-4">
            {user.profile_picture ? (
              <img src={user.profile_picture} alt="Profile Picture" />
            ) : (
              <i className="bx bxs-user-circle text-[90px] text-secondaryColor lg:text-[100px]"></i>
            )}

            <div className="flex flex-col gap-1 text-whiteColor lg:gap-2">
              <h3 className="text-xl lg:text-2xl">Emmy</h3>
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
      </div>
    </section>
  );
};

export default ProfilePage;
