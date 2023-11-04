import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import AboutPage from "../pages/about-page";
import LoginPage from "../pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
