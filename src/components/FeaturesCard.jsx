const FeaturesCard = ({ title, description, icon }) => {
  return (
    <div className="mt-[2rem] cursor-pointer">
      <div className="relative h-full max-h-[300px] w-full rounded-round border border-secondaryColor px-4 py-9 shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
        <i
          className={`${icon} absolute left-0 top-0 translate-x-[17px] translate-y-[-30px] rounded-round bg-secondaryColor px-3 py-2 text-2xl text-whiteColor`}
        ></i>

        <li className="">
          <h3 className="text-xl font-medium text-secondaryColor">{title}</h3>
          <p className="text-[1.1rem]">{description}</p>
        </li>
      </div>
    </div>
  );
};

export default FeaturesCard;
