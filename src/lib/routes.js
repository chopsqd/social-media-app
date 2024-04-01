import {createBrowserRouter} from 'react-router-dom'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../layout";

export const router = createBrowserRouter([
    {
        path: "",
        element: "Public Root"
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    },
    {
        path: "protected",
        element: <Layout />,
        children: [
            {path: 'dashboard', element: 'dash'}
        ]
    },
])
