import React, { createContext, useContext, useEffect, useState } from 'react';
import app from "../firebase";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState();
    const [valueditor, setValueditor] = useState('');
    const history = useHistory();

    //NOTE : SETERROR HERE IN REAL PROJECT AND PROJECT IT TO ANY COMPONENT.

    function signup(email, password, username) {
        const userdata = { displayName: username }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                updateuser(userdata);
                const user = userCredential.user;
                setCurrentUser(user)
                console.log(user.email);
                history.push("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });



    }

    function updateuser(userdata) {
        updateProfile(auth.currentUser, userdata).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    function login(email, password) {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setCurrentUser(user)
                // console.log(user);
                history.push("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });
    }

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            setCurrentUser();
            history.push("/login");
            console.log('Sign-out successful');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    function handleEditor(e) {
        setValueditor(e);
        // console.log(valueditor);
    }

    function Preview() {
        history.push(`/preview/${valueditor}`);
    }

    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // const uid = user.uid;
                    setCurrentUser(user)
                    // console.log(JSON.stringify(user.email) + 'is Signed In');
                    console.log(user);
                    // ...
                } else {
                    // User is signed out
                    // ...
                    console.log('No current user Signed In');
                }
            });
        };

        return unsubscribe();

    }, [auth])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        handleEditor,
        valueditor,
        Preview,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
