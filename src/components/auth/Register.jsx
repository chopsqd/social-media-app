import React from 'react';
import {useForm} from "react-hook-form"
import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text
} from '@chakra-ui/react';
import {Link as RouterLink} from "react-router-dom";
import {useRegister} from "../../hooks/auth"
import {emailValidate, passwordValidate, usernameValidate} from "../../utils/formValidate"

const Register = () => {
    const {register: signUp, isLoading} = useRegister()
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function handleRegister(data) {
        await signUp({...data, redirectTo: '/protected/dashboard'})
    }

    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
                <Heading mb="4" size="lg" textAlign="center">
                    Sign Up
                </Heading>

                <form onSubmit={handleSubmit(handleRegister)}>
                    <FormControl isInvalid={errors.username} py="2">
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="username"
                            {...register('username', usernameValidate)}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="user@mail.com"
                            {...register('email', emailValidate)}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="pass123"
                            {...register('password', passwordValidate)}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        mt="4"
                        type="submit"
                        colorScheme="teal"
                        size="md"
                        w="full"
                        isLoading={isLoading}
                        loadingText="Signing Up"
                    >
                        Sign Up
                    </Button>
                </form>

                <Text fontSize="xlg" align="center" mt="6">
                    Already have an account?&nbsp;
                    <Link
                        as={RouterLink}
                        to={'/login'}
                        color="teal.800"
                        fontWeight="medium"
                        textDecor="underline"
                        _hover={{background: "teal.100"}}
                    >
                        Sign In
                    </Link>
                    &nbsp;instead!
                </Text>
            </Box>
        </Center>
    );
};

export default Register;
