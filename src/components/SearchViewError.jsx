import { useRouteError } from "react-router-dom";

const SearchViewError = () => {
  const error = useRouteError();

  console.log(error);
  return (
    <div className="wrapper">
      <h1 className="text-lg text-whiteColor lg:text-xl">
        Internal server error
      </h1>
    </div>
  );
};

export default SearchViewError;
