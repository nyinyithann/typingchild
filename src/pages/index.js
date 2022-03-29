import React from "react";
import Landing3D from '../landing3D/Landing3D';

function Home() {
    return (
        <div className="flex w-full h-full relative">
            <Landing3D />
            <div id="home-desc" className="absolute top-0 left-2 w-fit h-[2.5rem] pr-10 flex justify-start items-center backdrop-filter backdrop-blur-3xl backdrop-brightness-75 rounded-b-full px-6 py-2">
                <img src="static/images/logo.png" alt="" className="w-[1.6rem] h-[1.6rem]" />
                <div className="pl-2 font-brand text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-tr from-orange-700 via-yellow-500 to-green-500 hover:from-yellow-500 hover:via-teal-500 hover:to-cyan-500">TypingChild.Com | The best place for kids to learn touch-typing.</div>
            </div>
        </div>
    );
}

export default Home;
