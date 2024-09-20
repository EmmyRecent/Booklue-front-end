import axios from "axios";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export const searchLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) return { books: { docs: [] } };

  try {
    const response = await axios.get(`http://localhost:5000/api/search`, {
      params: { q: query },
    });

    return { books: response.data };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch books");
  }
};

export const editProfileAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    id: data.get("userId"),
    photo: data.get("profileBit"),
    username: data.get("username"),
    name: data.get("name"),
    email: data.get("email"),
    bio: data.get("bio"),
  };

  // Post request to the server.
  try {
    const response = await axios.post("http://localhost:5000/editProfile", {
      submission,
    });

    console.log("Edit profile response:", response.data);

    return { message: response.data };
  } catch (err) {
    console.error(
      "Error submitting profile details:",
      err.response?.data || err.message,
    );

    if (err.response && err.response.status === 400) {
      return { error: err.response.data.message };
    }

    return {
      error: "An error occurred during profile edit, please try again later.",
    };
  }
};
