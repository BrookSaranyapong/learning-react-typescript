import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import "./global.css";
import HomePage from "./pages/home-page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  </React.StrictMode>
);
