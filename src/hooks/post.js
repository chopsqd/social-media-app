import {useState} from "react";
import {uuidv4} from "@firebase/util";
import {collection, doc, query, setDoc, orderBy, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import {db} from "../lib/firebase";
import {useAlert} from "./alert";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";

export function useAddPost() {
    const {showAlert} = useAlert()
    const [isLoading, setLoading] = useState(false)

    async function addPost(post) {
        setLoading(true)
        const id = uuidv4()
        await setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date: Date.now(),
            likes: []
        })
        showAlert("Post added successfully!", "success")
        setLoading(false)
    }

    return {addPost, isLoading}
}

export function usePosts() {
    const q = query(collection(db, "posts"), orderBy("date", "desc"))
    const [posts, isLoading, error] = useCollectionData(q)

    if(error) throw error

    return {posts, isLoading}
}

export function useToggleLike({id, isLiked, uid}) {
    const [isLoading, setLoading] = useState(false)

    async function toggleLike() {
        setLoading(true)
        const docRef = doc(db, "posts", id)
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)
        })
        setLoading(false)
    }

    return {toggleLike, isLoading}
}

export function useDeletePost(id) {
    const [isLoading, setLoading] = useState(false)

    async function deletePost() {

    }

    return {deletePost, isLoading}
}

export function usePostById(id) {
    const q = doc(db, "posts", id)
    const [post, isLoading] = useDocumentData(q)

    return {post, isLoading}
}
