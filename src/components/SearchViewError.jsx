import { useRouteError } from "react-router-dom";

const SearchViewError = () => {
  const error = useRouteError();

  console.log(error);
  return (
    <div className="wrapper min-h-screen items-center justify-center">
      <h1 className="text-lg text-whiteColor lg:text-3xl">
        Internal server error
      </h1>
    </div>
  );
};

export default SearchViewError;
