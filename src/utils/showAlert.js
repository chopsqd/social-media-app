import {useToast} from "@chakra-ui/react";

export function useAlert() {
    const toast = useToast()

    function showAlert(title, status, description) {
        toast({
            title,
            status,
            description,
            isClosable: true,
            position: "top",
            duration: 3000
        })
    }

    return {showAlert}
}
