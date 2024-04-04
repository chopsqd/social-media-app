import {createBrowserRouter} from 'react-router-dom'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import Comments from "../components/post/Comments";

export const router = createBrowserRouter([
    {
        path: "",
        element: "Welcome to the CUM Zone"
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
            {path: 'users', element: 'users'},
            {path: 'profile/:id', element: 'Profile'},
            {path: 'comments/:id', element: <Comments/>},
        ]
    },
])
