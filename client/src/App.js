import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/navbar";
import LeftBar from "./components/leftbar";
import RightBar from "./components/rightbar";
import config from "./config";

function App() {

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: config.routes.home.path,
          element: config.routes.home.element,
        },
        {
          path: config.routes.profile.path,
          element: config.routes.profile.element,
        },
      ],
    },
    {
      path: config.routes.login.path,
      element: config.routes.login.element,
    },
    {
      path: config.routes.register.path,
      element: config.routes.register.element,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;