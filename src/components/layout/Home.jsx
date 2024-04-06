import React from 'react';
import {Box, Center, Flex, Heading, Link} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";

const Home = () => {
    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
                <Heading mb="4" size="lg" textAlign="center">
                    Welcome!
                </Heading>

                <Flex justifyContent="space-between">
                    <Link
                        as={RouterLink}
                        to={'/register'}
                        color="teal.800"
                        fontWeight="medium"
                        textDecor="underline"
                        p="2"
                        _hover={{background: "teal.100"}}
                    >
                        Sign Up
                    </Link>

                    <Link
                        as={RouterLink}
                        to={'/login'}
                        color="teal.800"
                        fontWeight="medium"
                        textDecor="underline"
                        p="2"
                        _hover={{background: "teal.100"}}
                    >
                        Sign In
                    </Link>
                </Flex>
            </Box>
        </Center>
    );
};

export default Home;
