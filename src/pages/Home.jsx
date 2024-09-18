import axios from "axios";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ReviewPost from "../components/ReviewPost";

const socket = io("http://localhost:5000"); // Backend url.

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch initial posts when component mounts.
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getReviewBookPosts",
      );

      setPosts(response.data.data);
    };

    fetchPosts();

    // Listen for a real-time updates via webSocket.
    socket.on("reviewBookPosts", (updatedPosts) => {
      console.log("Updated Posts:", updatedPosts);
      setPosts(updatedPosts);
    });

    // Clean up the socket connection on component unmount.
    return () => {
      socket.off("reviewBookPosts");
    };
  }, []);

  console.log("Posts:", posts);

  return (
    <>
      <section className="hero">
        <div className="absolute inset-0 flex items-center bg-black bg-opacity-15">
          <div className="wrapper">
            <h1 className="subheading">
              Your Destination For High-Flying Reads
            </h1>
            <h1 className="heading">
              Explore Aviation, Automotive, <br /> Railways, Military, and More!
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
          <ul className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-7 py-8 max-[480px]:place-items-center sm:grid-cols-2 lg:grid-cols-3">
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
