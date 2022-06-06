import React, { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    FacebookAuthProvider,
    signInWithRedirect,
} from 'firebase/auth'
import { auth } from '../config'
import { sanityClient } from '../sanity'
import { useRouter } from "next/router"

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const router = useRouter();

    const [user, setUser] = useState(null)

    const signup = async (email, password, name) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
            })
    }

    useEffect(() => {
        if (user) {
            const doc = {
                _id: user.uid,
                _type: 'person',
                name: user.displayName,
                email: user.email,
                id: user.uid,
                image: user.photoURL,
            };
            sanityClient.createIfNotExists(doc)

        }
    }, [user])

    const login = async (email, password) => { await signInWithEmailAndPassword(auth, email, password) };

    const logout = () => {
        signOut(auth)
        router.push("/")
    };

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookProvider);
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        });
        return () => unsuscribe();
    }, [])

    return (
        <AppContext.Provider value={{
            user,
            signup,
            login,
            logout,
            loginWithGoogle,
            loginWithFacebook,
            resetPassword
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider