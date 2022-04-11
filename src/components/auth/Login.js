import {Menu} from '@headlessui/react';
import FacebookAuthBtn from 'components/auth/FacebookAuthBtn';
import GoogleAuthBtn from 'components/auth/GoogleAuthBtn';
import {FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import React from 'react';
import {useAuth} from 'services/firebase/auth';

function Login() {
    const {loggingIn, login} = useAuth();

    const handleGoogleLogin = (e) => {
        login(new GoogleAuthProvider());
    }
    const handleFacebookLogin = (e) => {
        login(new FacebookAuthProvider());
    }

    return (
        <Menu as="div" className="relative flex rounded-md">
            <Menu.Button
                className="flex space-x-2 rounded ring-0 outline-none bg-200 saturate-150 px-2 py-1 text-700 hover:bg-400 hover:text-white dark:bg-gray-400">
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
            <Menu.Items as="div" className="absolute right-[-2px] top-10 w-[16rem] rounded bg-500 shadow-lg flex flex-col space-y-[1px] focus:outline-none dark:bg-gray-700">
                <Menu.Item>
                    <div className="bg-300/80 p-2 dark:bg-gray-600/80 rounded-t">
                        <GoogleAuthBtn
                            className="google-auth-btn justify-start w-full pl-6"
                            isLoggingIn={loggingIn}
                            onClick={handleGoogleLogin}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div className="bg-300/80 p-2 dark:bg-gray-600/80 rounded-b">
                        <FacebookAuthBtn
                            className="facebook-auth-btn justify-start w-full pl-6"
                            isLoggingIn={loggingIn}
                            onClick={handleFacebookLogin}
                        />
                    </div>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}

export default Login;
