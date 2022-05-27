import React, { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../config'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log(user)
    }, [user])

    const signup = async (email, password, name) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
            })
    }

    const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
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
            resetPassword
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider