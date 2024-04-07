import {Progress, SimpleGrid} from "@chakra-ui/react";
import User from "./User";
import {useAllUsers} from "../../hooks/user";
import React from "react";

export default function Users() {
    const { users, isLoading } = useAllUsers()

    if (isLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
            {users?.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </SimpleGrid>
    );
}
