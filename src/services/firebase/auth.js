import {
    getAuth,
    signInWithPopup,
    signOut,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    connectAuthEmulator
} from 'firebase/auth';
import {useCallback, useEffect, useState} from 'react';
import app from 'services/firebase/firebase';
import {constructError, ERROR_TO_IGNORE, ERROR_TO_DISPLAY} from "util";

const auth = getAuth(app);
auth.useDeviceLanguage();

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://192.168.1.3:9099");
}

const defaultAuthUser = {
    name: undefined,
    email: undefined,
    photoURL: undefined,
    uid: undefined,
};

const extractUserInfo = (rawAuthUser) => {
    return rawAuthUser ? {
        name: rawAuthUser.displayName,
        email: rawAuthUser.email,
        photoURL: rawAuthUser.photoURL,
        uid: rawAuthUser.uid,
    } : defaultAuthUser;
};

export const useAuth = () => {
    const [authUser, setAuthUser] = useState(defaultAuthUser);
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState();

    const handleAuthStateChanged = useCallback((response) => {
        setAuthUser(extractUserInfo(response));
        setLoggingIn(false);
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
        return () => unsubscribe();
    }, []);

    const login = useCallback(async (provider) => {
        try {
            setLoggingIn(true);
            await setPersistence(auth, browserLocalPersistence);
            await signInWithPopup(auth, provider);
        } catch (error) {
            setLoggingIn(false);
            const errMsg = "An error occured while logging-in. Please close the dialog and try to login again.";
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
                setError(constructError(ERROR_TO_IGNORE, errMsg, error.code));
            } else if (error.code = 'auth/popup-blocked') {
                setError(constructError(ERROR_TO_DISPLAY, "Please configure your web browser to allow pop-up so that you can login."));
            } else {
                setError(constructError(ERROR_TO_DISPLAY, errMsg, error.code));
            }
        }
    });

    const logout = useCallback(async () => {
        try {
            setLoggingIn(true);
            signOut(auth);
        } catch (error) {
            setLoggingIn(false);
            const errMsg = "An error occured while logging-out. Please close the dialog and try to logout again.";
            setError(constructError(ERROR_TO_DISPLAY, errMsg, error.code));
        }
    });

    const resetError = useCallback(() => setError(undefined));

    return {loggingIn, error, authUser, login, logout, resetError};
};
