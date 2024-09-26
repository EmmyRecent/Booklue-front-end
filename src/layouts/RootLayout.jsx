import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollUp from "../components/ScrollUp";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
      <ScrollUp scrollY={scrollY} />
    </div>
  );
};

export default RootLayout;
