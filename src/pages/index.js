import React from "react";
import Landing3D from '../landing3D/Landing3D';

function Home() {
    return (
        <div className="flex w-full h-full relative">
            <Landing3D />
            <div id="home-desc" className="flex items-center justify-center absolute top-0 left-0 right-0 w-full h-[2.5rem] pr-10 backdrop-filter backdrop-blur-xl px-6 py-2">
                <img src="static/images/logo.png" alt="" className="w-[1.6rem] h-[1.6rem]" />
                <div className="pl-2 py-2 font-brand text-[0.7rem] md:text-[1.2rem] text-blue-400">TypingChild.Com | The best place for kids to learn touch-typing.</div>
            </div>
        </div>
    );
}

export default Home;
