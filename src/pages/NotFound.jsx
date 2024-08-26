import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="wrapper text-whiteColor flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-3xl">404</h2>
      <p className="text-2xl">Page not found!</p>
      <p className="text-sm">
        Go to the{" "}
        <Link
          to={"/"}
          className="hover:text-secondaryColor cursor-pointer underline duration-300 ease-in-out"
        >
          homepage
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
