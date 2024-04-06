import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Progress
} from "@chakra-ui/react";
import ProfileAvatar from "./ProfileAvatar";
import {useAuth} from "../../hooks/auth";
import {useUpdateAvatar} from "../../hooks/user";

const EditProfile = ({isOpen, onClose}) => {
    const { user, isLoading: authLoading } = useAuth();
    const {
        setFile,
        updateAvatar,
        isLoading: fileLoading,
        fileURL,
    } = useUpdateAvatar(user?.id);

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    if (authLoading) return <Progress size='xs' isIndeterminate/>

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit profile</ModalHeader>
                <ModalCloseButton avatar/>
                <ModalBody>
                    <HStack spacing="5">
                        <ProfileAvatar user={user} overrideAvatar={fileURL} />
                        <FormControl py="4">
                            <FormLabel htmlFor="picture">Change avatar</FormLabel>
                            <input multiple={false} type="file" accept="image/*" onChange={handleChange} />
                        </FormControl>
                    </HStack>
                    <Button
                        loadingText="Uploading"
                        w="full"
                        my="6"
                        colorScheme="teal"
                        onClick={updateAvatar}
                        isLoading={fileLoading}
                    >
                        Save
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditProfile;
