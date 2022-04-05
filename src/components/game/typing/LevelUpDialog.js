import React, {useState, useEffect} from "react";
import {Dialog} from '@headlessui/react';
import {ThemeSwitchContext} from 'components/providers/ThemeSwitchProvider';
import Confetti from 'react-confetti';
const giphyAPIEndpoint = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&tag=winner+happy&rating=g`;

function LevelUpDialog({level, isOpen, onClose}) {
    const {theme} = React.useContext(ThemeSwitchContext);
    const [giphyUrl, setGiphyUrl] = useState();
    const [confettiProps, setConfettiProps] = useState({opacity: 0.0, run: false, width: 800, height: 400});

    useEffect(() => {
        document.activeElement.blur();
        const getUrl = async () => {
            try {
                const resp = await fetch(giphyAPIEndpoint);
                if (resp.ok) {
                    let json = await resp.json();
                    const url = json.data.images.original.url;
                    setGiphyUrl(url);
                } else {
                    setGiphyUrl("");
                }
            } catch{
                setGiphyUrl("");
            }
        };
        setConfettiProps({
            run: true,
            confettiSource: {
                x: 0,
                y: 0,
                width: 10,
                height: 10
            }
        });
        getUrl();

        const timeout = setTimeout(onClose, 1000 * 60);
        const interval = setInterval(getUrl, 3000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
            setConfettiProps(prev => ({
                ...prev,
                run: false,
            }));
        };
    }, []);

    return (
        <Dialog as="div" open={isOpen} onClose={function () {}} className={`${theme} fixed inset-0 z-[100] h-full w-full`}>
            {
                confettiProps.run ?
                    <Confetti
                        numberOfPieces={100}
                        run={confettiProps.run}
                        recycle={true}
                        initialVelocityX={{min: 0, max: 0}}
                        initialVelocityY={{min: 0.05, max: 10}}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        onConfettiComplete={() => {
                            setConfettiProps(prev => ({
                                ...prev,
                                run: false,
                            }));
                        }}
                    /> : null
            }
            <div className="min-h-screen px-8 -mt-8 lg:mt-0 xl:px-4 text-center ring-0 outline-none">
                <Dialog.Overlay className="fixed inset-0 bg-gradient-to-br from-blue-400 via-400 to-indigo-400 dark:bg-slate-500" />
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                />
                <div className="inline-block h-full w-full transform rounded-md text-left align-middle bg-transparent">
                    <button
                        type="button"
                        className="block rounded-md w-[20rem] text-sm lg:text-base m-auto text-center py-2 px-4 ring-0 outline-none bg-300/80 z-50 text-700 hover:text-900 hover:cursor-pointer bg-opacity-60 dark:bg-slate-200"
                        onClick={onClose}
                    >
                        Click here to continue your lesson
                </button>
                    <div className="flex h-full max-h-[calc(100vh-12rem)] w-full flex-col overflow-hidden rounded-md">
                        <div id="levelup-msg-container" className="min-h-[24rem] flex flex-col items-center justify-center flex-1 overflow-hidden space-y-4">
                            <div className="flex flex-col space-y-4 items-center justify-center md:text-4xl font-primary pt-0 md:pt-6 text-center mt-0 text-900 drop-shadow">
                                <span className="text-yellow-900 text-base md:text-[2rem] block mt-2">👏👏👏</span>
                                <span className="block">Awesome!</span>
                                <span className="block">{`You have reached level ${level}.`}</span>
                            </div>
                            <div className="flex flex-col h-fit w-full px-10 py-4 overflow-hidden items-center justify-center rounded">
                                {
                                    giphyUrl
                                        ? (<div className="flex-shrink-0 flex items-center justify-center p-1 mb-4">
                                            <img src={giphyUrl} alt="" className="w-[22rem] h-[10rem] md:w-full md:h-full pb-[2rem] drop-shadow-lg brightness-100 rounded" />
                                        </div>)
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Dialog >
    )
}

export default React.memo(LevelUpDialog);
