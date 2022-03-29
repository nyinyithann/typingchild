import ThemeMenu from 'components/navigation/ThemeMenu';
import React from 'react';
import Greeting from 'components/navigation/Greeting';
import Profile from 'components/auth/Profile';
import Login from 'components/auth/Login';
import {useAuth} from 'services/firebase/auth';

function Navbar({showAuth}) {
    const {authUser} = useAuth();

    return (
        <nav className="fixed inset-x-0 z-50 flex-1 h-[3.4rem] w-full bg-gradient-to-bl from-[#311741] via-500 to-[#F0BF00] " >
            <div className="w-full py-2 px-4 md:px-4 lg:px-16 bg-opacity-60 backdrop-filter backdrop-blur-lg backdrop-brightness-105 bg-500/50">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center space-x-6">
                        <div className="flex h-10 items-center justify-center">
                            <img src="static/images/logo.png" alt="" className="w-[1.8rem] h-[1.8rem] mr-2" />
                            <Greeting className="font-brand text-2xl md:text-4xl font-extrabold text-900 tracking-wide drop-shadow-xl antialiased" name={authUser?.name} brand={`${showAuth ? '' : 'Typing Child'}`} />
                        </div>
                    </div>
                    {
                        showAuth ?
                            <div className="relative flex items-center space-x-2">
                                <ThemeMenu />
                                <div className="h-4 border-l-[1px] border-400/50" />
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

export default React.memo(Navbar);
