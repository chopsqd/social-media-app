import React from 'react';
import {useForm} from "react-hook-form"
import {
    Link,
    Center,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Text
} from '@chakra-ui/react';
import {Link as RouterLink} from "react-router-dom";
import {useLogin} from "../../hooks/auth"
import {emailValidate, passwordValidate} from "../../utils/formValidate"

const Login = () => {
    const {login, isLoading} = useLogin()
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function handleLogin(data) {
        await login({...data, redirectTo: '/protected/dashboard'})
    }

    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
                <Heading mb="4" size="lg" textAlign="center">
                    Sign In
                </Heading>

                <form onSubmit={handleSubmit(handleLogin)}>
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
                        loadingText="Logging In"
                    >
                        Sign In
                    </Button>
                </form>

                <Text fontSize="xlg" align="center" mt="6">
                    Don't have an account?&nbsp;
                    <Link
                        as={RouterLink}
                        to={'/register'}
                        color="teal.800"
                        fontWeight="medium"
                        textDecor="underline"
                        _hover={{background: "teal.100"}}
                    >
                        Sign Up
                    </Link>
                    &nbsp;instead!
                </Text>
            </Box>
        </Center>
    );
};

export default Login;
