import React from 'react';
import AddPost from "../post/AddPost";
import PostsList from "../post/PostsList";
import {usePosts} from "../../hooks/post";
import {Progress} from "@chakra-ui/react";

const Dashboard = () => {
    const {posts, isLoading} = usePosts()

    if (isLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <>
            <AddPost/>
            <PostsList posts={posts}/>
        </>
    )
};

export default Dashboard;
