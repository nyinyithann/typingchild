import React, {useState, useEffect} from 'react';

function GoogleAuthBtn({className, isLoggingIn, onClick}) {
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
                            d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                            fill="#4285F4"
                        ></path>
                        <path
                            d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                            fill="#34A853"
                        ></path>
                        <path
                            d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                            fill="#FBBC05"
                        ></path>
                        <path
                            d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                            fill="#EA4335"
                        ></path>
                    </svg>
            }
            <span className="ml-2 block">Login with Google</span>
        </button>
    );
}

export default GoogleAuthBtn;
