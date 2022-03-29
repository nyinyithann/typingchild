import {Menu} from '@headlessui/react';
import React from 'react';
import GoogleAuthBtn from 'components/auth/GoogleAuthBtn';
import FacebookAuthBtn from 'components/auth/FacebookAuthBtn';
import {useAuth} from 'services/firebase/auth';
import {GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';

function Login() {
    const {loggingIn, login} = useAuth();

    const handleGoogleLogin = (e) => {
        login(new GoogleAuthProvider());
    }
    const handleFacebookLogin = (e) => {
        login(new FacebookAuthProvider());
    }

    return (
        <Menu as="div" className="relative flex">
            {({open}) => (
                <>
                    <Menu.Button
                        type="button"
                        className={`flex space-x-2 rounded ring-0 outline-none bg-200 saturate-150 px-2 py-1 text-700 hover:bg-400 hover:text-white ${
                            open ? 'bg-100' : ''
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="inline-block">Login</span>
                    </Menu.Button>
                    <Menu.Items as="div" className="absolute right-[-2px] top-10 w-[16rem] rounded-md border-[1px] border-slate-300 bg-white p-2 shadow-lg flex flex-col space-y-2 focus:outline-none">
                        <Menu.Item>
                            <GoogleAuthBtn
                                className="google-auth-btn justify-start w-full pl-6"
                                isLoggingIn={loggingIn}
                                onClick={handleGoogleLogin}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <FacebookAuthBtn
                                className="facebook-auth-btn justify-start w-full pl-6"
                                isLoggingIn={loggingIn}
                                onClick={handleFacebookLogin}
                            />
                        </Menu.Item>
                    </Menu.Items>
                </>
            )}
        </Menu>
    );
}

export default Login;
