import { lazy } from "react";

const Main = lazy(() => import("../pages/Main"));
const Emails = lazy(() => import("../components/Emails"));
const ViewEmail = lazy(() => import("../components/ViewEmail"));

const routes = {
  main: {
    path: "/",
    element: Main,
  },
  emails: {
    path: "/emails", // email component is re render
    element: Emails,
  },
  invalid: {
    path: "/*", // email component is re render
    element: Emails,
  },
  view: {
    path: "/view",
    element: ViewEmail,
  },
};

export { routes };
