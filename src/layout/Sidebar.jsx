import React from 'react';
import {Box, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import ActiveUser from "./ActiveUser";

const Sidebar = () => {
    return (
        <Box
            px="6"
            height="100vh"
            w="100%"
            maxW="300px"
            borderLeft="1px solid"
            borderLeftColor="teal.100"
            position="sticky"
            top="16"
            display={{ base: "none", md: "block" }}
        >
            <ActiveUser/>
            <Box align="center">
                <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
                <Button
                    variant="outline"
                    colorScheme="teal"
                    as={Link}
                    to={"/protected/users"}
                    mt="4"
                    size="sm"
                >
                    ALL USERS
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;
