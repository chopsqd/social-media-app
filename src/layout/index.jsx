import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import Navbar from "../components/navbar";
import {Progress} from "@chakra-ui/react";

const Layout = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {user, isLoading} = useAuth()

    useEffect(() => {
        if (!isLoading && pathname.startsWith("/protected") && !user) {
            navigate('/login')
        }
    }, [pathname, user, isLoading])

    if (isLoading) return <Progress size='xs' isIndeterminate />

    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default Layout;
