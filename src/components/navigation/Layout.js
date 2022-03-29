import React from "react"
import TpHead from 'components/navigation/Head';

function Layout({children}) {
    return (
        <div className="flex flex-col bg-gradient-to-tr from-sky-100/70 via-200/80 to-blue-100/70">
            <TpHead />
            {children}
        </div>
    )
}

export default Layout;
