import Layout from 'components/navigation/Layout';
import ThemeSwitchProvider from 'components/providers/ThemeSwitchProvider';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {mountStoreDevtool} from 'simple-zustand-devtools';
import {useGameUserStore, useLessonStore} from 'stores';
import '../../styles/main.css';

const DEFAULT_THEME = 'theme-slate';

function MyApp({Component, pageProps}) {
    const [theme, setTheme] = useTheme(DEFAULT_THEME);

    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            mountStoreDevtool("GameUserStore", useGameUserStore);
            mountStoreDevtool("LessonStore", useLessonStore);
        }
    }, []);

    return (
        <ThemeSwitchProvider value={{theme, setTheme}}>
            <div className={`${theme}`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </ThemeSwitchProvider>
    );
}

export default MyApp;
