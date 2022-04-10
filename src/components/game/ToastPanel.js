import React from "react"

function InfoLine({text}) {
    return (
        <p className="text-lg font-sans text-left drop-shadow-lg text-900 dark:text-slate-300">
            {text}
        </p>
    );
}

function ToastPanel({toast, showThumb, info}) {
    return (
        <div className={`${toast.visible ? 'animate-enter' : 'animate-leave'} w-fit items-center justify-center bg-transparent rounded drop-shadow pointer-events-auto flex m-auto`}>
            <div className="flex-1 flex w-full p-4 border-1 border-900 rounded items-center justify-center bg-gradient-to-bl from-50 via-100 to-50 dark:bg-gray-600">
                <div className="flex items-center justify-center space-x-4">
                    {
                        showThumb
                            ? <div key={"thumb"} className="text-4xl border-[1px] border-transparent rounded-full shadow-xl shadow-200/60 dark:shadow-slate-700 dark:border-slate-500"><span className="block m-4 drop-shadow-lg">👍</span></div>
                            : null
                    }
                    <div key={"main-info"} className="flex flex-col items-start justify-center space-y-1">
                        {
                            info.map(x => <InfoLine key={x.length} text={x} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToastPanel
