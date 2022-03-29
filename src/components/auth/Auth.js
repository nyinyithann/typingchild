import React from 'react';
import Profile from 'components/auth/Profile';
import Login from 'components/auth/Login';
import {useAuth} from 'services/firebase/auth';

export default function Auth() {
    const {authUser} = useAuth();

    if (authUser && authUser.uid) {
        return <Profile />;
    } else {
        return <Login />;
    }
}
