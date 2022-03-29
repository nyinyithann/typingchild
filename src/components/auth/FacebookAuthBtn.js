import React, {useState, useEffect} from 'react';

function FacebookAuthBtn({className, isLoggingIn, onClick}) {
    const [processing, setProcessing] = useState(false);

    const handleClick = (e) => {
        setProcessing(true);
        onClick(e);
    }

    useEffect(() => {
        if (!isLoggingIn && processing) {
            setProcessing(false);
        }
    }, [isLoggingIn]);

    return (
        <button type="button" className={`${className} ${isLoggingIn ? 'cursor-not-allowed' : ''}`} onClick={handleClick} disabled={isLoggingIn}>
            {
                processing
                    ?
                    <svg className="animate-spin h-5 w-5 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    :
                    <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                    >
                        <path
                            d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"
                            fill="white"
                        ></path>
                    </svg>
            }
            <span className="ml-2 inline-block">Login with Facebook</span>
        </button>
    );
}

export default FacebookAuthBtn;
