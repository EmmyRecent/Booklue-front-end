import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <>
      <section className="account-hero">
        <div className="absolute inset-0 flex items-center bg-black bg-opacity-30">
          <div className="wrapper">
            <h1 className="subheading">Welcome To Bookly</h1>
            <h1 className="heading">Please login or create an account below</h1>
          </div>
        </div>
      </section>

      <>
        <Outlet />
      </>
    </>
  );
};

export default AccountLayout;
