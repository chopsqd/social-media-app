import React from 'react';
import {Box, Progress} from "@chakra-ui/react";
import Post from "../post/Post";
import {useParams} from "react-router-dom";
import {usePostById} from "../../hooks/post";
import NewComment from "./NewComment";
import CommentsList from "./CommentsList";

const Comments = () => {
    const {id} = useParams()
    const {post, isLoading} = usePostById(id)

    if (isLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Box align="center" pt="50">
            <Post post={post}/>
            <NewComment post={post}/>
            <CommentsList post={post}/>
        </Box>
    );
};

export default Comments;
