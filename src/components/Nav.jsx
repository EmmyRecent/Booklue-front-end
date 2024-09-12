import { useContext, useState } from "react";
import { Logo } from "../assets/icons";
import { navLinks } from "../constants";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    // console.log(value);

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    }
  };

  const handleSearchSubmit = (e) => {
    const { value } = e.target;
    setQuery(value);

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    }
  };

  const handleClick = () => {
    setIsExpanded((prevValue) => !prevValue);
  };

  return (
    <header className="sticky top-0 z-50 bg-primaryColor py-4 shadow-xl">
      <nav className="wrapper relative flex items-center justify-between">
        {/* logo */}
        <Link to={"/"}>
          <img
            src={Logo}
            alt="Bookly Logo"
            className="w-[130px] md:w-[160px]"
          />
        </Link>

        {/* Nav links */}
        <div
          className={`fixed top-0 z-40 h-full w-[85%] bg-grayColor lg:h-auto lg:w-auto lg:p-0 ${isExpanded ? "right-0" : "right-[-900px]"} px-8 py-24 transition-all duration-500 lg:static lg:bg-transparent`}
        >
          <ul className="mt-28 flex flex-col gap-4 text-whiteColor lg:mt-0 lg:flex-row lg:items-center">
            {navLinks.map((link) => (
              <li key={link.label} onClick={handleClick}>
                <NavLink
                  to={link.href}
                  className="block text-xl font-medium transition duration-300 ease-in-out hover:text-secondaryColor lg:inline-block"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Desktop search bar */}
            <Form action="/search" method="get" className="hidden lg:block">
              <div className="flex h-[43px] w-full items-center rounded-round bg-lightGrayColor">
                <input
                  type="text"
                  name="q"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Search for books"
                  className="h-[43px] w-full bg-transparent p-3 text-[1rem] text-whiteColor placeholder:text-[1rem] placeholder:text-primaryColor"
                />
                <button
                  type="button"
                  className="h-[43px] min-w-[107px] rounded-round bg-whiteColor px-3 font-medium text-secondaryColor"
                  onClick={handleSearchSubmit}
                >
                  Search now
                </button>
              </div>
            </Form>

            {/* Account */}
            <li>
              {isAuthenticated ? (
                <NavLink to={"/profile"} onClick={handleClick}>
                  <div className="flex flex-col gap-1 duration-300 ease-in-out hover:text-secondaryColor sm:flex-row sm:items-center lg:gap-0">
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        className="rounded-[100%]"
                        width={40}
                        height={40}
                        alt="User image"
                      />
                    ) : (
                      <i className="bx bxs-user-circle text-2xl text-secondaryColor lg:text-3xl"></i>
                    )}
                    <p className="mt-1 text-lg lg:text-sm">{user.email}</p>
                  </div>
                </NavLink>
              ) : (
                <NavLink to={"/account/login"} onClick={handleClick}>
                  <div className="flex transition duration-300 ease-in-out hover:text-secondaryColor lg:items-center lg:justify-center">
                    <i className="bx bxs-user-circle text-2xl text-secondaryColor"></i>
                    <span className="mt-1 text-lg">Account</span>
                  </div>
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        {/* Hamburger menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="tooltip">
            <i
              className="bx bx-search-alt text-2xl text-whiteColor"
              onClick={() => {
                setClicked((prevValue) => !prevValue);
              }}
            ></i>
            <span className="tooltiptext">search books</span>
          </div>

          <div className="z-50" onClick={handleClick}>
            <i
              className={`bx ${isExpanded ? "bx-x" : "bx-menu-alt-right"} text-4xl text-whiteColor`}
            ></i>
          </div>
        </div>
      </nav>

      {/* Search bar */}
      <Form
        action="/search"
        method="get"
        className={`wrapper mt-3 overflow-hidden ${clicked ? "h-[43px]" : "h-0"} transition-all duration-300`}
      >
        <div className="flex h-[43px] w-full items-center rounded-round bg-lightGrayColor">
          <input
            type="text"
            name="q"
            value={query}
            autoFocus={true}
            onChange={handleSearchChange}
            placeholder="Search for books"
            className="h-[43px] w-full bg-transparent p-3 text-[1rem] text-whiteColor placeholder:text-[1rem] placeholder:text-primaryColor"
          />
          <button
            type="button"
            className="h-[43px] min-w-[107px] rounded-round bg-whiteColor px-3 font-medium text-secondaryColor"
            onClick={handleSearchSubmit}
          >
            Search now
          </button>
        </div>
      </Form>
    </header>
  );
};

export default Nav;
