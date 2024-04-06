import {useState} from "react";
import {collection, doc, orderBy, query, setDoc, where, deleteDoc} from "firebase/firestore";
import {uuidv4} from "@firebase/util";
import {db} from "../lib/firebase";
import {useAlert} from "./alert";
import {useCollectionData} from "react-firebase-hooks/firestore";

export function useAddComment(postID, uid) {
    const {showAlert} = useAlert()
    const [isLoading, setLoading] = useState(false)

    async function addComment(text) {
        setLoading(true)
        const id = uuidv4()
        const docRef = doc(db, "comments", id)
        await setDoc(docRef, {text, id, postID, uid, date: Date.now()})
        showAlert("Comment added successfully!", "success")
        setLoading(false)
    }

    return {addComment, isLoading}
}

export function useComments(postID) {
    const q = query(
        collection(db, "comments"),
        where("postID", "==", postID),
        orderBy("date", "asc")
    );
    const [comments, isLoading, error] = useCollectionData(q);
    if (error) throw error;

    return {comments, isLoading};
}

export function useDeleteComment(id) {
    const {showAlert} = useAlert()
    const [isLoading, setLoading] = useState(false)

    async function deleteComment() {
        const res = window.confirm("Are you sure you want to delete this comment?")

        if (res) {
            setLoading(true)
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)
            showAlert("Comment deleted successfully!", "info")
            setLoading(false)
        }
    }

    return {deleteComment, isLoading}
}
