import React from "react"
import TpHead from 'components/navigation/Head';
import Script from 'next/script';

function Layout({children}) {
    return (
        <>
            <div className="flex flex-col bg-gradient-to-r from-50/80 via-100/60 to-50/80 dark:bg-gray-700 dark:h-[100vh]">
                <TpHead />
                {children}
            </div>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-MGCWCQCDEX" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-MGCWCQCDEX');`}
            </Script>
        </>
    );
}

export default Layout;
