import React from 'react';

export const ThemeSwitchContext = React.createContext();

function ThemeSwitchProvider({value, children}) {
    return (
        <ThemeSwitchContext.Provider value={value}>
            {children}
        </ThemeSwitchContext.Provider>
    );
}

export default ThemeSwitchProvider;
