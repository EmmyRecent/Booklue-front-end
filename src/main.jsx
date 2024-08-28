import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout.jsx";
import AccountLayout from "./layouts/AccountLayout.jsx";

// Pages
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import SearchView from "./components/SearchView.jsx";
import SearchViewError from "./components/SearchViewError.jsx";
import {
  editProfileAction,
  loginAction,
  searchLoader,
  signUpAction,
} from "./constants/index.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="about"
        element={<h1 className="wrapper">Hello world from about page</h1>}
      />
      <Route
        path="search"
        element={<SearchView />}
        loader={searchLoader}
        errorElement={<SearchViewError />}
      />

      <Route path="account" element={<AccountLayout />}>
        <Route path="login" element={<LogIn />} action={loginAction} />
        <Route path="register" element={<SignUp />} action={signUpAction} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={<ProfilePage />}
          action={editProfileAction}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
