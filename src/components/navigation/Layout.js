import React from "react"
import TpHead from 'components/navigation/Head';

function Layout({children}) {
    return (
        <div className="flex flex-col bg-gradient-to-r from-100/30 via-200/30 to-100/30">
            <TpHead />
            {children}
        </div>
    )
}

export default Layout;
