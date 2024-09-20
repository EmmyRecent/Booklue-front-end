const SuccessMessage = ({ message, isVisible }) => {
  return (
    <p
      className={`fixed bottom-0 right-0 inline-block translate-x-[-16px] translate-y-[-90px] rounded-round bg-red-500 p-2 text-xs font-medium text-whiteColor md:text-sm ${isVisible ? "fade-in" : "fade-in-hidden"}`}
    >
      {message}
    </p>
  );
};

export default SuccessMessage;
