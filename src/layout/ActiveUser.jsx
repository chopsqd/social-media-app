import React from 'react';
import {Button, Code, Spinner, Stack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import ProfileAvatar from "../components/profile/ProfileAvatar";

const ActiveUser = () => {
    const {user, isLoading} = useAuth()

    if (isLoading) return (
        <Stack align="center" my="8">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal.400'
                size='xl'
            />
        </Stack>
    )

    return (
        <Stack align="center" spacing="5" my="8">
            <ProfileAvatar user={user} />
            <Code>@{user.username}</Code>
            <Button
                colorScheme="teal"
                w="full"
                as={Link}
                to={`/protected/profile/${user.id}`}
            >
                Edit Profile
            </Button>
        </Stack>
    );
};

export default ActiveUser;
