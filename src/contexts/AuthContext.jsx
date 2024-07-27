/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { auth  } from '../firebase'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function reAuthenticate(password) {
        const credential = EmailAuthProvider.credential(currentUser.email, password)
        return reauthenticateWithCredential(currentUser, credential)
    }

    function deleteAccount(password) {
        return reAuthenticate(password).then(() => {
                return currentUser.delete()
            }
        )
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        reAuthenticate,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
