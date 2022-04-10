import {Dialog} from '@headlessui/react';
import {ThemeSwitchContext} from 'components/providers/ThemeSwitchProvider';
import React, {useEffect, useState} from 'react';
import {ERROR_TO_DISPLAY} from 'util';


function ErrorDialog({error, resetError}) {
    const {theme} = React.useContext(ThemeSwitchContext);
    const [open, setOpen] = useState(error && error.type === ERROR_TO_DISPLAY && error.message ? true : false);

    useEffect(() => {
        setOpen(error && error.type === ERROR_TO_DISPLAY && error.message ? true : false);
    }, [error]);

    const handleClose = (e) => {
        e.preventDefault();
        resetError();
    }

    return (
        <Dialog as="div" open={open} onClose={function () {}} className={`${theme} fixed inset-0 z-[100] `}>
            <div className="px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-slate-200/90" />
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                />
                <div className="my-8 inline-block transform bg-white text-left align-middle transition-all rounded shadow shadow-gray-500">
                    <div className="flex w-full flex-col overflow-hidden rounded-md">
                        <Dialog.Title
                            as="div"
                            className="min-h-4 flex p-2 mb-1 text-xl font-medium leading-6 text-pink-900 bg-slate-50 border-b-[1px] border-b-slate-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="block mt-1 ml-2">Message for you</span>
                            <button
                                type="button"
                                className="btn-primary ml-auto block rounded-full p-1"
                                onClick={handleClose}
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
                        <div className="h-fit flex-1 p-6 overflow-hidden leading-7 text-slate-700">
                            <p>{error?.message}</p>
                            <p>{error?.innerError}</p>
                        </div>
                        <div className="flex flex-none flex-shrink-0 justify-center space-x-2 p-2 bg-slate-50 border-t-[1px] border-t-slate-100">
                            <button
                                type="button"
                                className="btn-primary w-24 py-1 px-4"
                                onClick={handleClose}
                            >
                                Close
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ErrorDialog;
