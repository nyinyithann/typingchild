import {Popover} from '@headlessui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {useAuth} from 'services/firebase/auth';

function Profile() {
    const {authUser, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        router.push("/");
    }

    return (
        <div className="w-full max-w-sm">
            <Popover className="relative">
                <Popover.Button
                    type="button"
                    className="flex items-center justify-center rounded-full h-8 w-8 bg-200 saturate-150 text-700 p-[2px] hover:bg-400 hover:text-white ring-0 outline-none dark:bg-gray-400">
                    {
                        authUser?.photoURL ?
                            <img
                                src={authUser?.photoURL}
                                alt=""
                                className="h-6 w-6 rounded-full"
                            />
                            :
                            <DefaultProfileImage className="h-6 w-6" />
                    }
                </Popover.Button>
                <Popover.Panel className="absolute right-[-4px] top-10 z-50 w-[16rem] rounded shadow-md bg-500 dark:bg-gray-700">
                    <div className="flex flex-col items-stretch justify-start space-y-[1px]">
                        <div className="flex items-center justify-start p-2 bg-300/80 dark:bg-gray-600/80 rounded-t">
                            {
                                authUser?.photoURL ?
                                    <img
                                        src={authUser?.photoURL}
                                        alt=""
                                        className="h-24 w-24 rounded-full"
                                    />
                                    :
                                    <DefaultProfileImage className="h-24 w-24" />
                            }
                            <span className="ml-2 text-lg text-900 dark:text-gray-400">{`${
                                authUser?.name ?? 'Hi'
                                }`}</span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-300/80  dark:bg-gray-600/80">
                            <button
                                type="button"
                                className="btn-primary flex w-full items-center justify-center space-x-4 dark:text-gray-400 dark:border-gray-700 text-900 bg-300"
                                onClick={handleLogout}
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
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>
                                    Sign out
                                        </span>
                            </button>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-2 content-center px-4 py-2 bg-300/80  dark:bg-gray-600/80 dark:text-slate-400/80 rounded-b">
                            <a target="_blank" href="https://www.typingchild.com/privacy/privacypolicy" className="text-900/70 font-sans text-[0.8rem] 2xl:text-[0.7rem] px-1 hover:underline">Privacy Policy</a>
                            <a target="_blank" href="https://www.typingchild.com/privacy/datadeletionpolicy" className="text-900/70 font-sans text-[0.8rem] 2xl:text-[0.7rem] px-1 hover:underline">Data Policy</a>
                            <a target="_blank" href="https://www.typingchild.com/privacy/cookiepolicy" className="text-900/70 font-sans text-[0.8rem] 2xl:text-[0.7rem] px-1 hover:underline">Cookie Policy</a>
                            <a target="_blank" href="https://www.typingchild.com/toc" className="text-900/70 font-sans text-[0.8rem] 2xl:text-[0.7rem] px-1 hover:underline">Terms of service</a>
                        </div>
                    </div>
                </Popover.Panel>
            </Popover>
        </div>
    );
}

function DefaultProfileImage({className}) {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
    );
}

export default Profile;
