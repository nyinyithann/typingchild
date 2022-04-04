import React from "react"
import TpHead from 'components/navigation/Head';

function Layout({children}) {
    return (
        <div className="flex flex-col bg-gradient-to-r from-50/80 via-100/60 to-50/80 dark:bg-gray-700 dark:h-[100vh]">
            <TpHead />
            {children}
        </div>
    )
}

export default Layout;
