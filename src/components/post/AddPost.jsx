import React from 'react';
import {useForm} from "react-hook-form";
import {useAddPost} from "../../hooks/post";
import {useAuth} from "../../hooks/auth";
import {Box, Button, Heading, HStack, Textarea} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";

const AddPost = () => {
    const {register, handleSubmit, reset} = useForm()
    const {addPost, isLoading: addPostLoading} = useAddPost()
    const {user, isLoading: authLoading} = useAuth()

    function handleAddPost(data) {
        addPost({
            uid: user.id,
            text: data.text
        })
        reset()
    }

    return (
        <Box maxW="600px" mx="auto" py="10">
            <form onSubmit={handleSubmit(handleAddPost)}>
                <HStack justify="space-between" align="center">
                    <Heading size="lg">New Post</Heading>
                    <Button
                        colorScheme="teal"
                        type="submit"
                        isLoading={authLoading || addPostLoading}
                        loadingText="Posting"
                    >
                        Post
                    </Button>
                </HStack>
                <Textarea
                    as={TextareaAutosize}
                    resize="none"
                    mt="5"
                    placeholer="Create a new post..."
                    minRows={3}
                    {...register("text", {required: true})}
                />
            </form>
        </Box>
    );
};

export default AddPost;
