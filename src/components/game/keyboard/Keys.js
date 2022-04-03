import React from "react"

const getStyle = (values) => {
    let result = "";
    const baseStyle = "flex justify-center items-center content-center border-[1px] border-300 bg-white/90 rounded-[0.2rem] text-900/70 dark:text-slate-400 drop-shadow-[-1px_2px_1px_rgba(200,200,200,0.5)] font-semibold font-keyboard md:leading-[1.4rem] dark:bg-gray-600";
    const valueCount = values.length;
    const firstValue = values[0];
    const responsiveStyle = "" +
        "h-[1.8rem] " +
        "md:h-[2.6rem] " +
        "lg:h-[3rem] " +
        "xl:h-[3.2rem] " +
        "2xl:h-[3.6rem] ";
    if (valueCount === 1) {
        result = `${baseStyle} ${responsiveStyle} ${firstValue.length === 1 ? 'text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]' : 'text-[0.5rem] md:text-[0.9rem] p-[1px]'}`;
    } else if (valueCount === 2) {
        result = `${baseStyle} ${responsiveStyle} flex-col text-[0.7rem] md:text-[1rem] p-2`;
    } else {
        result = `${baseStyle} ${responsiveStyle}`;
    }
    return result;
}

const cmp = (prev, current) => prev.keyToPress === current.keyToPress;
const pressStyle = "bg-sky-400/80 dark:bg-sky-400/80 dark:text-gray-800 text-800 border-[1px] border-sky-400 brightness-110 xl:animate-key_fadein";

export const Key = React.memo(({values, textSpanStyle, keyToPress}) => {
    const cn = React.useMemo(() => {
        let cn = getStyle(values);
        const hasKeyToPress = values.includes(keyToPress) || values.includes(keyToPress?.toLowerCase());
        if (hasKeyToPress) {
            cn = `${cn} ${pressStyle}`;
        }
        return cn;
    }, [values, keyToPress]);

    return (
        <div className={cn} >
            {
                values.map(x => (<span className={textSpanStyle} key={x}>{x.toUpperCase()}</span>))
            }
        </div>
    );
}, cmp);

export const ShiftKey = React.memo(({values, textSpanStyle, keyToPress, associagedKeys}) => {
    const cn = React.useMemo(() => {
        let cn = getStyle(values);
        if (associagedKeys.includes(keyToPress)) {
            cn = `${cn} ${pressStyle}`;
        }
        return cn;
    }, [values, keyToPress]);

    return (
        <div className={cn} >
            {
                values.map(x => (<span className={textSpanStyle} key={x}>{x.toUpperCase()}</span>))
            }
        </div>
    );
}, cmp);
