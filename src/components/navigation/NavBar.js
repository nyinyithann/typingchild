import Login from 'components/auth/Login';
import Profile from 'components/auth/Profile';
import Greeting from 'components/navigation/Greeting';
import ThemeMenu from 'components/navigation/ThemeMenu';
import React from 'react';
import {useAuth} from 'services/firebase/auth';

function Navbar({showAuth}) {
    const {authUser} = useAuth();

    return (
        <nav className="fixed inset-x-0 z-50 flex-1 h-[3.4rem] w-full bg-gradient-to-t from-300 via-400/60 to-400/80 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
            <div className="w-full py-2 px-4 md:px-4 lg:px-16 bg-opacity-60 dark:filter-none dark:bg-gray-800">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center space-x-6">
                        <div className="flex h-10 items-center justify-center">
                            <img src="static/images/logo.png" alt="" className="w-[1.8rem] h-[1.8rem] mr-2 dark:grayscale-[90%]" />
                            <Greeting className="font-brand text-xl md:text-4xl font-extrabold text-700 tracking-wide drop-shadow-xl antialiased dark:text-gray-400" name={authUser?.name} brand={`${showAuth ? '' : 'Typing Child'}`} />
                        </div>
                    </div>
                    {
                        showAuth ?
                            <div className="relative flex items-center space-x-2">
                                <ThemeMenu />
                                <div className="h-4 border-l-[1px] border-400/50 dark:border-gray-300" />
                                {
                                    authUser && authUser.uid
                                        ?
                                        <Profile />
                                        :
                                        <Login />
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
