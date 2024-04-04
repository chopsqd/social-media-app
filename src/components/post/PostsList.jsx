import React from 'react';
import {Box, Text} from "@chakra-ui/react";
import Post from "./Post";

const PostsList = ({posts}) => {
    return (
        <Box px="4" align="center">
            {!posts.length
                ? <Text textAlign="center" fontSize="xl">No posts yet...</Text>
                : posts.map(post => <Post key={post.id} post={post}/>)
            }
        </Box>
    )
};

export default PostsList;
