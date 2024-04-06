import React from 'react';
import {Box, Flex, IconButton, Progress, Text} from "@chakra-ui/react";
import ProfileAvatar from "../profile/ProfileAvatar";
import UsernameButton from "../profile/UsernameButton";
import {formatDistanceToNow} from "date-fns";
import {useUser} from "../../hooks/user";
import {useAuth} from "../../hooks/auth";
import {FaTrash} from "react-icons/fa";
import {useDeleteComment} from "../../hooks/comments";

const Comment = ({comment}) => {
    const {text, uid, date, id} = comment
    const { user, isLoading: userLoading } = useUser(uid);
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

    if (userLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
            <Flex pb="2">
                <ProfileAvatar user={user} size="sm" />
                <Box flex="1" ml="4">
                    <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
                        <Box>
                            <UsernameButton user={user} />
                            <Text fontSize="xs" color="gray.500">
                                {formatDistanceToNow(date)} ago
                            </Text>
                        </Box>
                        {!authLoading && authUser.id === uid && (
                            <IconButton
                                size="sm"
                                ml="auto"
                                icon={<FaTrash />}
                                colorScheme="red"
                                variant="ghost"
                                isRound
                                onClick={deleteComment}
                                isLoading={deleteLoading}
                            />
                        )}
                    </Flex>
                    <Box pt="2" fontSize="sm">
                        <Text>{text}</Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Comment;
