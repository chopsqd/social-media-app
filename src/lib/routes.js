import {createBrowserRouter} from 'react-router-dom'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import Comments from "../components/comments/Comments";
import Profile from "../components/profile/Profile";
import Home from "../components/layout/Home";
import Users from "../components/users/Users";

export const router = createBrowserRouter([
    {
        path: "",
        element: <Home/>
    },
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    },
    {
        path: "protected",
        element: <Layout/>,
        children: [
            {path: 'dashboard', element: <Dashboard/>},
            {path: 'users', element: <Users/>},
            {path: 'profile/:id', element: <Profile/>},
            {path: 'comments/:id', element: <Comments/>},
        ]
    },
    {
        path: "*",
        element: <Login/>
    }
])
