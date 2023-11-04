import { RouteObject } from "react-router-dom";
import HomePage from "../pages/home-page";
import AboutPage from "../pages/about-page";

const mainRoute: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
];
export default mainRoute;
