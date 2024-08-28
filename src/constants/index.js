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

export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Post request to the server.
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: submission.email,
      password: submission.password,
    });

    if (response.status === 200) {
      console.log("Login successful", response.data);

      // You can store the user info in local storage or global state
      // Example: localStorage.setItem("user", JSON.stringify(response.data.user));

      return { message: response.data.message, user: response.data.user };
    } else {
      console.log("Unexpected response", response);
    }
  } catch (err) {
    console.error("Error submitting login details", err);

    // Customizing the error message.
    let errorMessage = "Failed to submit login details";

    if (err.message && err.response.status === 401) {
      errorMessage = "Invalid email or password. please try again";
    }

    console.log(errorMessage);

    return { error: errorMessage };
  }
};

export const signUpAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Post request to the server.
  try {
    const response = await axios.post("http://localhost:5000/signup", {
      email: submission.email,
      password: submission.password,
    });

    console.log("Signup response:", response.data);

    return { message: response.data };
  } catch (err) {
    console.error(
      "Error submitting signup details",
      err.response?.data || err.message,
    );

    // Handle specific errors (e.g., validation, duplicate email) based on the server's response.
    if (err.response && err.response.status === 400) {
      return { error: err.response.data.message };
    }

    // Fallback error message.
    return {
      error: "An error occurred during signup, please try again later.",
    };
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
