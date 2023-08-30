import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes/routes"; // importing the routes created for handling different url routes
import SuspenseLoader from "./components/common/SuspenseLoader"; // showing loading text while component is loading
import DataProvider from "./context/DataProvider";

const ErrorComponent = lazy(() => import("./components/common/ErrorComponent"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={routes.main.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />} // by default  we will be navigated to the inbox on the main page
      />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route
          path={`${routes.emails.path}/:type`} // child component rendering
          element={<routes.emails.element />}
          errorElement={<ErrorComponent />} // to handle error generated while loading the component
        />
        <Route
          path={routes.view.path}
          element={<routes.view.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>

      <Route
        path={routes.invalid.path} // invalid after / will lead to inbox as default
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Suspense>
  );
}

export default App;
