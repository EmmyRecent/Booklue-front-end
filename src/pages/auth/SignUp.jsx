import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "../../components/Button";
import { google } from "../../assets/icons";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  // A function to handle sign up of the users.
  const handleSignup = async (e) => {
    console.log("Sign up button was clicked!");
    e.preventDefault();

    const submission = {
      email: inputValue.email,
      password: inputValue.password,
    };

    console.log(submission);

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        submission,
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("Sign up successful", response.data);

        setIsAuthenticated(true);
        setUser(response.data.user);

        navigate("/profile");
      } else {
        console.log("Unexpected response", response);
      }
    } catch (err) {
      console.error("Error submitting login details", err);

      // Customizing the error message.
      let errorMessage = "Failed to submit signup details";

      if (err.message && err.response.status === 401) {
        errorMessage = "Invalid email or password. please try again";
      }

      console.log(errorMessage);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <form
        method="post"
        className="wrapper rounded-round border border-secondaryColor px-4 py-8 shadow-2xl lg:max-w-[50%] lg:p-8"
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4">
              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={inputValue.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
              </div>
            </div>

            <Button text="Sign up" signUp={handleSignup} />

            {/* {data && data.error && (
              <p className="pt-4 text-sm text-red-500">{data.error}!</p>
            )} */}
          </div>

          <p className="my-2 text-center text-lg font-medium text-whiteColor">
            OR
          </p>

          <div className="flex cursor-pointer gap-2 self-center rounded-round bg-whiteColor p-2">
            <img src={google} alt="google icon" width={24} height={24} />
            <p>Sign up with google</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-whiteColor lg:text-lg">
          Already have an account?{" "}
          <Link
            to={"/account/login"}
            className="cursor-pointer text-secondaryColor"
          >
            click here to login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
