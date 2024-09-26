const ScrollUp = ({ scrollY }) => {
  return (
    <a
      href="#"
      className={`fixed ${scrollY > 200 ? "bottom-4" : "-bottom-1/2"} right-10 z-50 rounded-full bg-secondaryColor px-4 py-2 text-lg font-bold text-whiteColor duration-200 ease-in-out hover:-translate-y-1`}
    >
      <i className="bx bx-up-arrow-alt mt-2"></i>
    </a>
  );
};

export default ScrollUp;
