import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc, query, updateDoc} from "firebase/firestore";
import {uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {db, storage} from "../lib/firebase";
import {useState} from "react";
import {useAlert} from "./alert";
import {useNavigate} from "react-router-dom";

export function useUser(id) {
    const q = query(doc(db, "users", id))
    const [user, isLoading] = useDocumentData(q)

    return {user, isLoading}
}

export function useUpdateAvatar(uid) {
    const navigate = useNavigate()
    const {showAlert} = useAlert()
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function updateAvatar() {
        if(!file) {
            return showAlert("No file selected!", "error")
        }

        setIsLoading(true)
        const fileRef = ref(storage, "avatars/" + uid)
        await uploadBytes(fileRef, file)

        const avatarURL = await getDownloadURL(fileRef)

        const docRef = doc(db, "users", uid)
        await updateDoc(docRef, {avatar: avatarURL})

        showAlert("Profile updated!", "success")
        setIsLoading(false)

        navigate(0)
    }

    return {
        setFile,
        updateAvatar,
        isLoading,
        fileURL: file && URL.createObjectURL(file)
    }
}
