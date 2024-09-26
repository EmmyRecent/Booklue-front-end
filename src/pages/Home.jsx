import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import ReviewPost from "../components/ReviewPost";
import { apiUrl } from "../constants";
import { heroImg, heroImg2, heroImg3 } from "../assets/images";

const socket = io(`${apiUrl}`); // Backend url.

const Home = () => {
  const [posts, setPosts] = useState([]);
  const images = useMemo(() => [heroImg, heroImg2, heroImg3], []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Preload images when the component mounts
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Set fade-out before changing image.
      setFadeIn(false);

      setTimeout(() => {
        // Move to the  next image and then fade-in.
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1,
        );

        setFadeIn(true);
      }, 500); // Duration for transition fade out.
    }, 30000); // Change every 15 seconds.

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    // Fetch initial posts when component mounts.
    const fetchPosts = async () => {
      const response = await axios.get(`${apiUrl}/api/getReviewBookPosts`);

      setPosts(response.data.data);
    };

    fetchPosts();

    // Listen for a real-time updates via webSocket.
    socket.on("reviewBookPosts", (updatedPosts) => {
      setPosts(updatedPosts);
    });

    // Clean up the socket connection on component unmount.
    return () => {
      socket.off("reviewBookPosts");
    };
  }, []);

  return (
    <>
      <section
        className={`hero transition-opacity duration-500 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className="absolute inset-0 flex items-center bg-black bg-opacity-35">
          <div className="wrapper">
            <h1 className="subheading">
              Your Destination For High-Flying Reads
            </h1>
            <h1 className="heading">
              {/* Explore Aviation, Automotive, <br /> Railways, Military, and More! */}
              Track, Review, Share Your Reading Journey, <br /> and more!
            </h1>
          </div>
        </div>
      </section>

      <section className="min-h-screen translate-y-[-130px]">
        <div className="wrapper">
          <h2 className="text-xl font-normal text-secondaryColor lg:text-2xl">
            Recent Posts
          </h2>

          {/* Fetch book posts. */}
          <ul className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-7 py-8 pb-0 max-[480px]:place-items-center sm:grid-cols-2 lg:grid-cols-3">
            {[...posts].reverse().map((post, index) => (
              <ReviewPost key={index} {...post} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
