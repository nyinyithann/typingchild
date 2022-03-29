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
            <div className="flex flex-col items-center justify-center w-full overflow-hidden h-[calc(100vh-3.7rem)]">
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
