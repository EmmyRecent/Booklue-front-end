import { Link } from "react-router-dom";
import { aboutImg, demo1, demo2, demo3, flyBook } from "../assets/images";
import { coreFeatures, upcomingFeatures } from "../constants";
import FeaturesCard from "../components/FeaturesCard";
import UpcomingFeaturesCard from "../components/UpcomingFeaturesCard";
import { useEffect } from "react";

const About = () => {
  const heroImage = aboutImg;

  // Preload images when the component mounts
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
  }, [heroImage]);

  return (
    <>
      {/* Hero */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 flex items-center bg-black bg-opacity-35">
          <div className="wrapper flex flex-col gap-2">
            <h1 className="text-3xl text-whiteColor lg:text-[2.8rem]">
              Your Reading Journey, Re-imagined
            </h1>

            <button className="mr-auto inline-block cursor-pointer rounded-round bg-secondaryColor px-3 py-2 text-whiteColor">
              <Link
                to={"/account/register"}
                className="text-md font-medium lg:text-lg"
              >
                Join the community!
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-5 lg:pb-[7rem]">
        <div className="wrapper text-whiteColor">
          <div className="py-4 lg:py-8">
            <h1 className="text-2xl text-secondaryColor lg:text-3xl">
              Welcome to Booklue:{" "}
              <span className="text-whiteColor">
                Your Personal Reading Companion
              </span>
            </h1>
          </div>

          <div className="mt-3 text-[1.1rem]">
            <p className="mb-4">
              Ever finish a book and struggle to recall the most important
              details? That&apos;s exactly where{" "}
              <span className="highlight">Booklue</span> began. Born from a love
              of reading and the need to remember and reflect,{" "}
              <span className="highlight">Booklue</span> is more than just a
              tool — it&apos;s your ultimate social space for everything books!
            </p>

            <div>
              <img
                src={flyBook}
                alt="Flying book"
                className="float-right mb-4 ml-2 w-full max-w-[500px] rounded-round shadow-xl md:mb-0"
              />

              <p className="mb-4">
                With <span className="highlight">Booklue</span>, you can easily
                log every book you&apos;ve read, jot down your thoughts, and
                assign ratings. Your personal library showcases when you read
                them, your notes, and reviews, all in one place. Even better?
                You can sort your books by rating, recency, or title on your
                profile, making it super simple to find exactly what you&apos;re
                looking for.
              </p>

              <p className="mb-4">
                But that&apos;s not all! The best part of{" "}
                <span className="highlight">Booklue</span> is that you
                don&apos;t have to keep your book journey to yourself. Share
                your reading experience with others by making your notes and
                reviews public for other users to discover. And in{" "}
                <span className="highlight">version 2.0</span>, you&apos;ll have
                messaging, commenting, and liking features to connect with
                fellow book lovers even more.
              </p>

              <p>
                <span className="highlight">Booklue</span> isn&apos;t just an
                app—it&apos;s a community. So dive in, explore, and let&apos;s
                build a world where your reading journey comes alive, one book
                at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 lg:pb-[7rem]">
        <div className="wrapper text-whiteColor">
          <h2 className="mb-3 text-2xl lg:text-3xl">Core features</h2>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature, index) => (
              <FeaturesCard key={index} {...feature} />
            ))}
          </ul>
        </div>
      </section>

      {/* Visual demo */}
      <section className="py-5 lg:pb-[7rem]">
        <div className="wrapper text-whiteColor">
          <h2 className="mb-3 text-2xl lg:text-3xl">Visual demo</h2>

          <p className="py-4">Beautiful UI 😉</p>

          <div className="visual relative flex items-center overflow-y-scroll rounded-round border border-secondaryColor p-4 lg:justify-center">
            <div className="flex gap-4">
              <img src={demo3} alt="demo3" className="max-w-[300px]" />
              <img src={demo2} alt="demo2" className="max-w-[300px]" />
              <img src={demo1} alt="demo1" className="max-w-[300px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-5 lg:pb-[7rem]">
        <div className="wrapper text-whiteColor">
          <h2 className="mb-3 text-2xl lg:text-3xl">
            User stories / Testimonials
          </h2>

          {/* Testimonials goes here */}
          <div className="flex min-h-[20vh] items-center justify-center">
            <p className="text-lg font-medium text-grayColor lg:text-xl">
              No user reviews yet!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming features */}
      <section className="Mb-4 py-5">
        <div className="wrapper text-whiteColor">
          <h2 className="mb-3 text-2xl capitalize lg:text-3xl">
            Coming soon in version 2.0:{" "}
            <span className="highlight">Connect with fellow readers!</span>
          </h2>
          <p className="mb-4 text-[1.1rem]">
            Get ready to take your reading experience to the next level with
            exciting new social features!
          </p>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((feature, index) => (
              <UpcomingFeaturesCard key={index} {...feature} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
