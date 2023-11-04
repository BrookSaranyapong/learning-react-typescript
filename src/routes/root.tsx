import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login-page";
import routeDashboard from "./dashboard";
import mainRoute from "./main";

const router = createBrowserRouter([
  ...mainRoute,
  {
    path: "/login",
    element: <LoginPage />,
  },
  ...routeDashboard,
]);

export default router;
