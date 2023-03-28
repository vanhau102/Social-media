import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";

const routes = {
    home: { path: '/', element: <Home /> },
    login: { path: '/login', element: <Login /> },
    register: { path: '/register', element: <Register /> },
    profile: { path: '/profile/:id', element: <Profile /> },
}


export default routes;
