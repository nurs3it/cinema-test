import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "@/layouts/default";
import { lazy } from "react";

const MainPage = lazy(() => import("./main").then(module => ({ default: module.MainPage })));
const NotFound = lazy(() => import("./404").then(module => ({ default: module.NotFoundPage })));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
