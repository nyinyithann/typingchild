import Login from 'components/auth/Login';
import Profile from 'components/auth/Profile';
import React from 'react';
import {useAuth} from 'services/firebase/auth';

export default function Auth() {
    const {authUser} = useAuth();

    if (authUser && authUser.uid) {
        return <Profile />;
    } else {
        return <Login />;
    }
}
