import {createBrowserRouter} from 'react-router-dom'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export const router = createBrowserRouter([
    {path: "/", element: "Public Root"},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
])
