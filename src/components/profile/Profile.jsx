import React from 'react';
import {Stack, Flex, Text, HStack, Divider, Progress, Button, useDisclosure} from "@chakra-ui/react";
import ProfileAvatar from "./ProfileAvatar";
import {useParams} from "react-router-dom";
import {usePosts} from "../../hooks/post";
import PostsList from "../post/PostsList";
import {useUser} from "../../hooks/user";
import {useAuth} from "../../hooks/auth";
import {format} from "date-fns";
import EditProfile from "./EditProfile";

const Profile = () => {
    const { id } = useParams();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id);
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (userLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Stack spacing="5">
            <Flex p={["4", "6"]} pos="relative" align="center">
                <ProfileAvatar user={user} size="2xl"/>

                {!authLoading && authUser.id === user.id && (
                    <Button
                        pos="absolute"
                        mb="2"
                        top="6"
                        right="6"
                        colorScheme="teal"
                        onClick={onOpen}
                    >
                        Change avatar
                    </Button>
                )}

                <Stack ml="10">
                    <Text fontSize="2xl">{user.username}</Text>
                    <HStack spacing="10">
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Posts: {posts.length}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Likes: {posts.reduce((sum, obj) => sum + obj.likes.length, 0)}
                        </Text>
                        <Text color="gray.700" fontSize={["sm", "lg"]}>
                            Joined: {format(user.date, "MMMM YYY")}
                        </Text>
                    </HStack>
                </Stack>

                <EditProfile isOpen={isOpen} onClose={onClose} />
            </Flex>
            <Divider />

            {postsLoading ? (
                <Text>Posts are loading...</Text>
            ) : (
                <PostsList posts={posts} />
            )}
        </Stack>
    );
};

export default Profile;
