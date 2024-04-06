import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../lib/firebase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {doc, getDoc, setDoc} from "firebase/firestore";
import isUsernameExist from "../utils/isUsernameExist";
import {useAlert} from "./alert";

export function useAuth() {
    const [authUser, authLoading, error] = useAuthState(auth)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const ref = doc(db, "users", authUser.uid)
            const docSnap = await getDoc(ref)
            setUser(docSnap.data())
            setIsLoading(false)
        }

        if (!authLoading) {
            if (authUser) fetchData()
            else setIsLoading(false)
        }
    }, [authLoading])

    return { user, isLoading, error }
}

export function useLogin() {
    const navigate = useNavigate()
    const {showAlert} = useAlert()
    const [isLoading, setIsLoading] = useState(false)

    async function login({email, password, redirectTo = "/protected/dashboard"}) {
        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            showAlert("You are logged in", "success")

            navigate(redirectTo)
        } catch(error) {
            showAlert("Login error", "error")

            setIsLoading(false)
            return false
        }

        setIsLoading(false)
        return true
    }

    return {login, isLoading}
}

export function useRegister() {
    const navigate = useNavigate()
    const {showAlert} = useAlert()
    const [isLoading, setIsLoading] = useState(false)

    async function register({username, email, password, redirectTo = "/protected/dashboard"}) {
        setIsLoading(true)

        try {
            const usernameExist = await isUsernameExist(username)
            if(usernameExist) {
                return showAlert("Username already exists", "error")
            }

            const res = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                username: username.toLowerCase(),
                avatar: "",
                date: Date.now()
            })

            showAlert("Account created", "success", "You are logged in")

            navigate(redirectTo)
        } catch (error) {
            showAlert("Registration error", "error", error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {register, isLoading}
}

export function useLogout() {
    const navigate = useNavigate()
    const {showAlert} = useAlert()
    const [signOut, isLoading, error] = useSignOut(auth)

    async function logout() {
        if(await signOut()) {
            showAlert("Successfully logged out", "success")
            navigate('/login')
        } else {
            showAlert("Logout error", "error", error.message)
        }
    }

    return {logout, isLoading}
}
