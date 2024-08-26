import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { google } from "../../assets/icons";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const LogIn = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const data = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);

      navigate("/profile");
    }
  }, [data, setIsAuthenticated, setUser, navigate]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Form
        method="post"
        action="/account/login"
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
                  placeholder="Your email address"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                />
              </div>
            </div>

            <Button text="Login" />

            {data && data.error && (
              <p className="pt-4 text-sm text-red-500">{data.error}!</p>
            )}
          </div>

          <p className="my-2 text-center text-lg font-medium text-whiteColor">
            OR
          </p>

          <div className="flex cursor-pointer gap-2 self-center rounded-round bg-whiteColor p-2">
            <img src={google} alt="google icon" width={24} height={24} />
            <p>Login with google</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-whiteColor lg:text-lg">
          haven&apos;t got an account?{" "}
          <Link
            to={"/account/register"}
            className="cursor-pointer text-secondaryColor"
          >
            click here to sign up
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default LogIn;
