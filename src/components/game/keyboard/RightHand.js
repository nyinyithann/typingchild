import React from "react"
import {RightShiftKeys, RightHandKeyMap} from 'components/game/keyboard/keyInfo';

const baseHandStyle = "w-[100%] h-auto absolute origin-top-right scale-50 opacity-60 lg:animate-hand_fadein";

const styleMap = new Map([
    ['7', "-top-[0%] right-[21%] sm:-top-[2%] sm:right-[20%] md:top-[2%] md:right-[20%] xl:-top-[28%] xl:right-[24%] xl:-rotate-[20deg] 2xl:-top-[34%] xl:right-[24%]"],
    ['&', "-top-[0%] right-[21%] sm:-top-[2%] sm:right-[20%] md:top-[2%] md:right-[20%] xl:-top-[28%] xl:right-[24%] xl:-rotate-[20deg] 2xl:-top-[34%] xl:right-[24%]"],
    ['8', "-top-[0%] right-[14%] sm:-top-[2%] sm:right-[13%] xl:-top-[28%] xl:right-[16%] xl:-rotate-[22deg] 2xl:-top-[34%] xl:right-[24%]"],
    ['*', "-top-[0%] right-[14%] sm:-top-[2%] sm:right-[13%] xl:-top-[28%] xl:right-[16%] xl:-rotate-[22deg] 2xl:-top-[34%] xl:right-[24%]"],
    ['9', "top-[2%] right-[16%] sm:top-[4%] sm:right-[14%] xl:-top-[20%] xl:right-[16%] xl:-rotate-[22deg]"],
    ['(', "top-[2%] right-[16%] sm:top-[4%] sm:right-[14%] xl:-top-[20%] xl:right-[16%] xl:-rotate-[22deg]"],
    ['0', "top-[2%] right-[10%] sm:-top-[4%] sm:right-[8%] xl:-top-[2%] xl:right-[8%]"],
    [')', "top-[2%] right-[10%] sm:-top-[4%] sm:right-[8%] xl:-top-[2%] xl:right-[8%]"],
    ['-', "top-[2%] right-[2%] sm:-top-[4%] sm:right-[0%] md:top-[2%] md:right-[0%] xl:-top-[2%] xl:right-[0%]"],
    ['_', "top-[2%] right-[2%] sm:-top-[4%] sm:right-[0%] md:top-[2%] md:right-[0%] xl:-top-[2%] xl:right-[0%]"],
    ['=', "top-[2%] -right-[4%] sm:-top-[4%] sm:-right-[6%] md:top-[3%] md:-right-[6%] xl:top-[10%] xl:-right-[6%] xl:rotate-[6deg]"],
    ['+', "top-[2%] -right-[4%] sm:-top-[4%] sm:-right-[6%] md:top-[3%] md:-right-[6%] xl:top-[10%] xl:top-[10%] xl:-right-[6%] xl:rotate-[6deg]"],
    ['y', "top-[24%] right-[11%] sm:top-[24%] sm:right-[11%] xl:top-[20%] xl:top-[20%] xl:right-[10%]"],
    ['u', "top-[24%] right-[8%] sm:top-[22%] sm:right-[8%] md:top-[24%] md:right-[8%] xl:top-[20%] xl:right-[7%]"],
    ['i', "top-[24%] right-[6%] sm:top-[24%] sm:right-[6%] md:top-[24%] md:right-[6%] xl:top-[22%] xl:right-[6%]"],
    ['o', "top-[24%] right-[6%] sm:top-[28%] sm:right-[6%] md:top-[24%] md:right-[6%] xl:top-[22%] xl:right-[6%]"],
    ['p', "top-[24%] right-[2%] sm:top-[20%] sm:right-[2%] md:top-[24%] md:right-[2%] xl:top-[22%] xl:right-[2%] 2xl:top-[20%] 2xl:right-[2%]"],
    ['[', "top-[22%] -right-[4%] sm:top-[12%] sm:-right-[4%] md:top-[22%] md:-right-[4%] xl:top-[16%] xl:-right-[4%]"],
    ['{', "top-[22%] -right-[4%] sm:top-[12%] sm:-right-[4%] md:top-[22%] md:-right-[4%] xl:top-[16%] xl:-right-[4%]"],
    [']', "top-[24%] -right-[4%] sm:top-[18%] sm:-right-[4%] md:top-[24%] md:-right-[4%] xl:top-[18%] xl:-right-[3%]"],
    ['}', "top-[24%] -right-[4%] sm:top-[18%] sm:-right-[4%] md:top-[24%] md:-right-[4%] xl:top-[18%] xl:-right-[3%]"],
    ['\\', "top-[24%] -right-[4%] sm:top-[14%] sm:-right-[4%] md:top-[24%] md:-right-[4%] xl:top-[18%] xl:-right-[4%]"],
    ['|', "top-[24%] -right-[4%] sm:top-[14%] sm:-right-[4%] md:top-[24%] md:-right-[4%] xl:top-[18%] xl:-right-[4%]"],
    ['h', "top-[34%] right-[8%] sm:top-[28%] sm:right-[8%] md:top-[34%] md:right-[8%] xl:top-[28%] xl:right-[6%]"],
    ['j', "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    ['k', "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    ['l', "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    [';', "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    [':', "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[32%] xl:right-[4%]"],
    ['\'', "top-[38%] right-[4%] sm:top-[38%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[36%] xl:right-[3%]"],
    ['"', "top-[38%] right-[4%] sm:top-[38%] sm:right-[4%] md:top-[38%] md:right-[4%] xl:top-[36%] xl:right-[3%]"],
    ['n', "top-[38%] right-[0%] sm:top-[18%] sm:right-[0%] md:top-[28%] md:right-[0%] xl:top-[28%] xl:-right-[0%] 2xl:top-[24%] 2xl:-right-[1%]"],
    ['m', "top-[38%] -right-[6%] sm:top-[18%] sm:-right-[6%] md:top-[32%] md:-right-[5%] xl:top-[28%] xl:-right-[6%]"],
    [',', "top-[38%] right-[4%] sm:top-[18%] sm:right-[6%] md:top-[32%] md:right-[6%]  xl:top-[20%] xl:right-[9%] xl:-rotate-[7deg] 2xl:top-[14%] 2xl:right-[8%] 2xl:-rotate-[8deg]"],
    ['<', "top-[38%] right-[4%] sm:top-[20%] sm:right-[6%] md:top-[32%] md:right-[6%] xl:top-[20%] xl:right-[9%] xl:-rotate-[7deg] 2xl:top-[14%] 2xl:right-[8%] 2xl:-rotate-[8deg]"],
    ['.', "top-[38%] right-[4%] sm:top-[20%] sm:right-[2%] md:top-[30%] md:right-[8%] xl:top-[20%] xl:right-[9%] xl:-rotate-[7deg] 2xl:top-[12%] 2xl:right-[8%] 2xl:-rotate-[8deg]"],
    ['>', "top-[38%] right-[4%] sm:top-[20%] sm:right-[2%] md:top-[30%] md:right-[8%] xl:top-[20%] xl:right-[9%] xl:-rotate-[7deg] 2xl:top-[12%] 2xl:right-[8%] 2xl:-rotate-[8deg]"],
    ['/', "top-[38%] right-[6%] sm:top-[20%] sm:right-[4%] md:top-[30%] md:right-[6%] xl:top-[28%] xl:right-[7%] xl:-rotate-[1deg] 2xl:top-[22%] 2xl:right-[6%] 2xl:-rotate-[4deg]"],
    ['?', "top-[38%] right-[6%] sm:top-[20%] sm:right-[4%] md:top-[30%] md:right-[6%] xl:top-[28%] xl:right-[7%] xl:-rotate-[1deg] 2xl:top-[22%] 2xl:right-[6%] 2xl:-rotate-[4deg]"],
    ["j_default", "top-[38%] right-[4%] sm:top-[26%] sm:right-[4%] md:top-[34%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    ["right_space", "top-[38%] right-[4%] sm:top-[28%] sm:right-[4%] md:top-[34%] md:right-[4%] xl:top-[32%] xl:right-[4%] 2xl:top-[33%] 2xl:right-[4%] 2xl:rotate-[2deg]"],
    ["shift_right", "top-[38%] right-[0%] sm:top-[25%] sm:right-[0%] md:top-[34%] md:right-[0%] xl:top-[32%] xl:-right-[5%]"]
]);

export const RightHand = React.memo(({keyToPress}) => {
    const [imgSrc, imgName, style] = React.useMemo(() => {
        let name;
        let key;
        if (keyToPress === '' || keyToPress === ' ') {
            name = "right_space";
            key = "right_space";
        } else if (RightShiftKeys.includes(keyToPress)) {
            name = "shift_right";
            key = "shift_right";
        } else {
            name = RightHandKeyMap.get(keyToPress);
            key = name ? keyToPress?.toLowerCase() : "j_default";
        }
        return [`static/hand/${name || "j_default"}.svg`, name, `${baseHandStyle} ${styleMap.get(key) || ''}`];
    }, [keyToPress]);

    return (
        <div>
            <img key={imgName} src={imgSrc} alt="" className={style} />
        </div>
    )
}, (prev, current) => prev.keyToPress === current.keyToPress);

