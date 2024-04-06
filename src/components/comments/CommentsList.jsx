import React from 'react';
import {useComments} from "../../hooks/comments";
import {Box, Progress} from "@chakra-ui/react";
import Comment from "./Comment";

const CommentsList = ({post}) => {
    const { id } = post;
    const {comments, isLoading} = useComments(id)

    if (isLoading) return <Progress size='xs' isIndeterminate/>

    return <Box>
        {comments.map(comment =>
            <Comment key={comment.id} comment={comment}/>
        )}
    </Box>
};

export default CommentsList;
