import React from 'react';
import {Link} from "react-router-dom";
import {Avatar} from "@chakra-ui/react";

const ProfileAvatar = ({user, size = "xl", overrideAvatar = null}) => {
    return (
        <Avatar
            as={Link}
            to={`/protected/profile/${user.id}`}
            name={user.username}
            size={size}
            src={overrideAvatar || user.avatar}
            _hover={{cursor: "pointer", opacity: "0.8"}}
        />
    );
};

export default ProfileAvatar;
