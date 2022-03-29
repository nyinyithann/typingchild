import {Dialog} from '@headlessui/react';
import LessonPanelContainer from 'components/game/lesson/LessonPanelContainer';
import {ThemeSwitchContext} from 'components/providers/ThemeSwitchProvider';
import React, {useState, useEffect} from 'react';

function LessonDialog({isOpen, onClose, onOk, selectedLessonId}) {
    const {theme} = React.useContext(ThemeSwitchContext);
    const [currentLessonId, setCurrentLessonId] = useState(selectedLessonId);

    useEffect(() => setCurrentLessonId(selectedLessonId), [selectedLessonId]);

    const handleLessonSelect = (lessonId, isDoubleClick) => {
        if (isDoubleClick) {
            onOk(lessonId);
        } else {
            setCurrentLessonId(lessonId);
        }
    };

    // h-[calc(100vh-10rem)] 
    // min-h-[calc(100vh-12rem)]
    return (
        <Dialog as="div" open={isOpen} onClose={function () {}} className={`${theme} fixed inset-0 z-[100] `}>
            <div className="min-h-screen px-8 -mt-8 lg:mt-0 xl:px-4 text-center ring-0 outline-none">
                <Dialog.Overlay className="fixed inset-0 bg-gradient-to-br from-blue-400 via-400 to-indigo-400  ring-0 outline-none" />
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                />
                <div className="my-8 inline-block sm:h-[calc(100vh-4rem)] xl:h-[calc(100vh-7rem)] w-full max-w-6xl transform rounded-md bg-white text-left align-middle shadow  ring-0 outline-none">
                    <div className="flex h-full sm:min-h-[calc(100vh-4rem)] w-full flex-col overflow-hidden rounded-md  ring-0 outline-none">
                        <Dialog.Title
                            as="div"
                            className="min-h-4 flex p-2 mb-1 text-xl font-medium leading-6 text-500 bg-300  ring-0 outline-none"
                        >
                            <span className="block mt-1 text-900 drop-shadow-md  ring-0 outline-none">Choose a lesson</span>
                            <button
                                type="button"
                                className="btn-primary ml-auto block rounded-full p-1 ring-0 outline-none"
                                onClick={onClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Dialog.Title>
                        <div className="min-h-[20rem] flex-1 overflow-hidden  ring-0 outline-none">
                            <LessonPanelContainer canLoad={isOpen} onLessonSelect={handleLessonSelect} selectedLessonId={currentLessonId} />
                        </div>
                        <div className="flex flex-none flex-shrink-0 justify-center space-x-2 p-2 bg-300 border-t-[1px] border-t-slate-100  ring-0 outline-none">
                            <button
                                type="button"
                                className="btn-primary w-24 py-1 px-4 ring-0 outline-none"
                                onClick={onClose}
                            >
                                Cancel
                                    </button>
                            <button
                                type="button"
                                disabled={currentLessonId >= 0 ? false : true}
                                className={`btn-primary w-24 py-1 px-4 ${currentLessonId >= 0 ? 'cursor-pointer' : 'cursor-not-allowed border-gray-100/30'}`}
                                onClick={e => {
                                    e.preventDefault();
                                    onOk(currentLessonId);
                                }}
                            >
                                Ok
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default React.memo(LessonDialog);
