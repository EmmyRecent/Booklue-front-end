import { Form } from "react-router-dom";
import Button from "./Button";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfile = ({ close }) => {
  const { user } = useContext(AuthContext);
  const [emailValue, setEmailValue] = useState(user.email);
  const [base64Image, setBase64Image] = useState(""); // state to store base 64 image.

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  // A function to load image files and convert to Base64
  const loadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setBase64Image(reader.result); // store the base 64 string as a state.
      const output = document.getElementById("profileImage");
      output.src = reader.result; // Update the image preview
    };

    if (file) {
      reader.readAsDataURL(file); // Convert to Base64
    } else {
      console.log("No file selected or file type is incorrect");
    }
  };

  return (
    <div className="mx-4 h-full w-full bg-transparent text-whiteColor lg:max-w-[700px]">
      <Form
        action="/profile"
        method="post"
        className="relative rounded-round bg-lightGrayColor p-8"
      >
        <div className="flex items-center justify-between pb-6">
          <p className="text-xl lg:text-2xl">Edit Profile</p>
          <i className="bx bx-x cursor-pointer text-3xl" onClick={close}></i>
        </div>

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="flex flex-col items-start justify-between gap-2 py-6 sm:flex-row sm:items-center">
          <p className="editText">Profile Photo:</p>

          <div className="relative mx-auto inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt="Profile Picture"
              id="profileImage"
              className="block rounded-full"
              width={120}
              height={120}
            ></img>
            <i
              className="bx bx-edit absolute bottom-0 right-0 z-50 -translate-x-[10px] cursor-pointer rounded-[100%] bg-secondaryColor p-2 text-sm"
              onClick={() => {
                document.getElementById("fileInput").click();
              }}
            ></i>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={loadFile}
            />
          </div>
        </div>

        <input
          type="text"
          value={base64Image}
          className="hidden"
          onChange={loadFile}
          name="profileBit"
        />

        <input
          type="text"
          className="hidden"
          onChange={loadFile}
          value={user.id}
          name="userId"
        />

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="editText">Username:</p>

          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <input
              type="text"
              className="mb-2 w-full px-4 py-2 text-blackColor"
              name="username"
              placeholder="Your username"
            />
            <p className="mb-2 text-sm lg:text-lg">www.Booklue.com/@username</p>
            <p className="text-sm lg:text-lg">
              Usernames can only contain letters, numbers, underscores, and
              periods. Changing your username will also change your profile
              link.
            </p>
          </div>
        </div>

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="editText">Name:</p>

          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <input
              type="text"
              className="mb-2 w-full px-4 py-2 text-blackColor"
              name="name"
              placeholder="Your Name"
            />
            <p className="text-sm lg:text-lg">
              Your Name / Nickname would be displayed on your profile
            </p>
          </div>
        </div>

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="editText">Email:</p>

          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <input
              type="text"
              className="mb-2 w-full px-4 py-2 text-blackColor"
              name="email"
              placeholder="Your Email"
              onChange={handleEmailChange}
              value={emailValue}
            />
          </div>
        </div>

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="editText">Bio:</p>

          <div className="mx-auto flex w-full max-w-[400px] flex-col">
            <textarea
              type="text"
              className="mb-2 w-full px-4 py-2 text-blackColor"
              name="bio"
              placeholder="Bio"
              rows={3}
            />
          </div>
        </div>

        <hr className="absolute left-0 right-0 bg-whiteColor" />

        <div className="pt-6">
          <div className="flex items-center justify-end gap-4">
            <div
              className="cursor-pointer rounded-round bg-secondaryColor px-10 py-2 text-whiteColor"
              onClick={close}
            >
              <p>Cancel</p>
            </div>
            <Button text={"Save"} click={close} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
