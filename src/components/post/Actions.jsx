import React from 'react';
import {Flex, IconButton, Progress} from "@chakra-ui/react";
import {FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash} from "react-icons/fa";
import {useAuth} from "../../hooks/auth";
import {useToggleLike} from "../../hooks/post";
import {Link} from "react-router-dom";

const Actions = ({post}) => {
    const {id, likes} = post
    const {user, isLoading: userLoading} = useAuth()

    const isLiked = likes.includes(user?.id)

    const {toggleLike, isLoading: likeLoading} = useToggleLike({id, isLiked, uid: user?.id})

    if (userLoading) return <Progress size='xs' isIndeterminate/>

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
                    // icon={isLiked ? <FaComment /> : <FaRegComment/>}
                    isRound
                />
                n
            </Flex>

            <IconButton
                ml="auto"
                // onClick={deletePost}
                size="md"
                colorScheme="red"
                variant="ghost"
                icon={<FaTrash />}
                isRound
            />
        </Flex>
    );
};

export default Actions;
