import {Switch} from '@headlessui/react';
import React from "react";

function Toggle({className, checked, onChange, children}) {
    return (
        <div className={className}>
            {children}
            <Switch
                checked={checked}
                onChange={onChange}
                className={`${checked ? 'bg-400 dark:bg-gray-800 dark:text-gray-400' : 'bg-200 dark:bg-gray-500'} relative inline-flex items-center justify-center flex-shrink-0 h-[1.5rem] w-[3rem] rounded-sm cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
            >
                <span
                    className={`${checked ? 'translate-x-[0.75rem]' : 'translate-x-[-0.75rem]'} pointer-events-none inline-block h-[1.2rem] w-[1.2rem] rounded-sm bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 z-50 dark:bg-gray-400`}
                />
                <div className="flex justify-between text-[0.7rem] absolute top-0 left-0 right-0 px-[4px] text-50 tracking-wide leading-[1.5rem]">
                    <span>On</span>
                    <span>Off</span>
                </div>
            </Switch>
        </div>
    );
}

function Icon({children}) {
    return (
        <>{children}</>
    );
}

Toggle.Icon = Icon;

export default Toggle
