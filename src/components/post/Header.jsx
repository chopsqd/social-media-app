import React from 'react';
import {Box, Flex, Progress, Text} from "@chakra-ui/react";
import ProfileAvatar from "../profile/ProfileAvatar";
import {useUser} from "../../hooks/user";
import {formatDistanceToNow} from "date-fns";
import UsernameButton from "../profile/UsernameButton";

const Header = ({post}) => {
    const {uid, date} = post
    const {user, isLoading} = useUser(uid)

    if (isLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Flex
            alignItems="center"
            borderBottom="2px solid"
            borderColor="teal.100"
            p="3"
            bg="gray.50"
        >
            <ProfileAvatar user={user} size="md"/>

            <Box ml="4">
                <UsernameButton user={user} />
                <Text fontSize="sm" color="gray.500">
                    {formatDistanceToNow(date)} ago
                </Text>
            </Box>
        </Flex>
    );
};

export default Header;
