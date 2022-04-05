import React from 'react';
import NavBar from 'components/navigation/NavBar';
import GameBoard from 'components/game/GameBoard';
import CookieConsent from 'react-cookie-consent';

function Play() {

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const fbdebugPanel = document.getElementsByClassName("firebase-emulator-warning");
            if (fbdebugPanel) {
                fbdebugPanel[0].style.cssText = "display: none;";
            }
        }
    }, []);

    return (
        <>
            <div className="h-[3.6rem]">
                <NavBar showAuth={true} />
            </div>
            <div className="md:hidden md:h-0 w-[90%] m-auto bg-gradient-to-tr from-red-300/30 to-pink-300/30 flex items-center border-b-2 border-b-red-600 animate-blink_cursor">
                <p className="font-sans text-900 drop-shadow-md px-4 text-center">The app is designed to work on laptop or desktop computer. Please use one.</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-3.7rem)] overflow-auto xl:overflow-x-hidden xl:overflow-y-scroll 2xl:overflow-hidden scrollbar dark:dark-scrollbar">
                <div className="flex items-center justify-center w-[99vw]">
                    <GameBoard />
                </div>
            </div>
            <CookieConsent
                location="bottom"
                buttonText="Accept"
                cookieName="typingchildcom_cookie"
                style={{
                    background: "rgba(111 200 111 0.2)",
                    borderTop: "1px solid whitesmoke",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                }}
                buttonStyle={{
                    padding: "0.5rem 2rem 0.5rem 2rem",
                    color: "brown"
                }}
                expires={365}
            >
                <p className="text-800 font-bold font-keyboard">This website uses cookies to enhance the user experience.</p>
            </CookieConsent>
        </>
    );
}

export default Play
