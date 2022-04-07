import {Dialog} from '@headlessui/react';
import {ThemeSwitchContext} from 'components/providers/ThemeSwitchProvider';
import React from 'react';

function Loading({loading}) {
    const {theme} = React.useContext(ThemeSwitchContext);
    return (
        <Dialog as="div" open={loading} onClose={function () {}} className={`${theme} fixed inset-0 z-50 `}>
            <div className="-mt-10 px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-slate-200/90" />
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                />
                <div className="inline-block transform bg-white text-left align-middle shadow shadow-slate-200 transition-all rounded">
                    <div className="flex w-full items-center justify-center rounded-md h-fit flex-1 py-2 px-20 overflow-hidden leading-7 text-slate-700">
                        <svg className="animate-spin h-5 w-5 text-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="pl-4 font-primary text-500">Please await loading...</p>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Loading;
