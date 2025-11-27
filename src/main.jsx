import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Template from "./Template";
import App from "./App";
import MovieDetails from "./MovieDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      { index: true, element: <App /> },
      { path: "movie/:id", element: <MovieDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
