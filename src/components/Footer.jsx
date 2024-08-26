const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <footer>
      <div className="wrapper text-whiteColor border-t-secondaryColor border-t-[1px] p-6 text-center">
        <h3 className="capitalize">
          Copyright © {year} by Chukwuemeka | All rights reserved
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
