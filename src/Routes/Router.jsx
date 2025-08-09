import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import UpcomingEvents from "../pages/UpcomingEvents/UpcomingEvents";
import Register from "../pages/Register/Register";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import PrivateRoute from "./PrivateRoute";
import Spinner from "../components/Spinner";
import EventDetails from "../pages/EventDetails/EventDetails";
import JoinedEvents from "../pages/JoinedEvents/JoinedEvents";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Community from "../pages/Community/Community";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "upcoming-events",
        Component: UpcomingEvents,
      },
      {
        path: "community",
        Component: Community,
        loader: () => fetch(`${import.meta.env.VITE_apiURL}/community`),
        hydrateFallbackElement: <Spinner />,
      },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "view-event/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),

        hydrateFallbackElement: <Spinner />,
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
