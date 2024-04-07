import React from 'react';
import {Flex, IconButton, Progress} from "@chakra-ui/react";
import {FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash} from "react-icons/fa";
import {useAuth} from "../../hooks/auth";
import {useToggleLike, useDeletePost} from "../../hooks/post";
import {Link} from "react-router-dom";
import {useComments} from "../../hooks/comments";

const Actions = ({post}) => {
    const {id, likes, uid} = post
    const {comments, isLoading: commentsLoading} = useComments(id)
    const {user, isLoading: userLoading} = useAuth()

    const isLiked = likes.includes(user?.id)
    const isCommented = comments?.some(obj => obj.uid === user?.id)

    const {toggleLike, isLoading: likeLoading} = useToggleLike({id, isLiked, uid: user?.id})
    const {deletePost, isLoading: deleteLoading} = useDeletePost(id)

    if (userLoading || commentsLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Flex p="2">
            <Flex alignItems="center">
                <IconButton
                    onClick={toggleLike}
                    isLoading={likeLoading || userLoading}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    icon={isLiked ? <FaHeart /> : <FaRegHeart/>}
                    isRound
                />
                {isLiked ? <b>{likes.length}</b> : likes.length}
            </Flex>
            <Flex alignItems="center" ml="2">
                <IconButton
                    as={Link}
                    to={`/protected/comments/${id}`}
                    size="md"
                    colorScheme="teal"
                    variant="ghost"
                    icon={isCommented ? <FaComment /> : <FaRegComment/>}
                    isRound
                />
                {isCommented ? <b>{comments?.length}</b> : comments?.length}
            </Flex>

            {!userLoading && user.id === uid && (
                <IconButton
                    ml="auto"
                    onClick={deletePost}
                    isLoading={deleteLoading}
                    size="md"
                    colorScheme="red"
                    variant="ghost"
                    icon={<FaTrash/>}
                    isRound
                />
            )}
        </Flex>
    );
};

export default Actions;
