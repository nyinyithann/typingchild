import {LeftHandKeyMap, LeftShiftKeys} from 'components/game/keyboard/keyInfo';
import React from "react";

const baseHandStyle = "w-[100%] h-auto absolute origin-top-left scale-50 opacity-60 lg:animate-hand_fadein";

const styleMap = new Map([
    ["`", "-top-[2%] -left-[16%] sm:-top-[8%] sm:-left-[16%] md:-top-[0%] md:-left-[16%] xl:-top-[8%] xl:-left-[16%] xl:rotate-3"],
    ["~", "-top-[2%] -left-[16%] sm:-top-[8%] sm:-left-[16%] md:-top-[0%] md:-left-[16%] xl:-top-[8%] xl:-left-[16%] xl:rotate-3"],
    ["1", "-top-[2%] -left-[10%] sm:-top-[6%] sm:-left-[10%] md:-top-[0%] md:-left-[10%] xl:-top-[4%] xl:-left-[10%]"],
    ["!", "-top-[2%] -left-[10%] sm:-top-[6%] sm:-left-[10%] md:-top-[0%] md:-left-[10%] xl:-top-[4%] xl:-left-[10%]"],
    ["2", "top-[2%] -left-[2%] sm:top-[4%] sm:-left-[3%] md:top-[6%] md:-left-[2%] xl:top-[4%] xl:-left-[2%] xl:rotate-2"],
    ["@", "top-[2%] -left-[2%] sm:top-[4%] sm:-left-[3%] md:top-[6%] md:-left-[2%] xl:top-[4%] xl:-left-[2%] xl:rotate-2"],
    ["3", "top-[2%] -left-[4%] sm:-top-[2%] sm:-left-[4%] md:top-[3%] md:-left-[4%] xl:top-[2%] xl:-left-[4%]"],
    ["#", "top-[2%] -left-[4%] sm:-top-[2%] sm:-left-[4%] md:top-[3%] md:-left-[4%] xl:top-[2%] xl:-left-[4%]"],
    ["4", "top-[2%] left-[2%] sm:-top-[2%] sm:left-[2%] md:top-[3%] md:left-[3%] xl:top-[2%] xl:left-[3%]"],
    ["$", "top-[2%] left-[2%] sm:-top-[2%] sm:left-[2%] md:top-[3%] md:left-[3%] xl:top-[2%] xl:left-[3%]"],
    ["5", "top-[2%] left-[4%] sm:-top-[2%] sm:left-[4%] md:top-[3%] md:left-[5%] xl:top-[1%] xl:left-[6%]"],
    ["%", "top-[2%] left-[4%] sm:-top-[2%] sm:left-[4%] md:top-[3%] md:left-[5%] xl:top-[1%] xl:left-[6%]"],
    ["6", "top-[2%] left-[11%] sm:-top-[2%] sm:left-[12%] md:top-[3%] md:left-[12%] xl:top-[1%] xl:left-[12%]"],
    ["^", "top-[2%] left-[11%] sm:-top-[2%] sm:left-[12%] md:top-[3%] md:left-[12%] xl:top-[1%] xl:left-[12%]"],
    ["q", "top-[18%] -left-[6%] sm:top-[20%] sm:-left-[6%] md:top-[22%] md:-left-[6%] xl:top-[18%] xl:-left-[6%]"],
    ["w", "top-[28%] -left-[3%] sm:top-[28%] sm:-left-[4%] md:top-[28%] md:-left-[4%] xl:top-[25%] xl:-left-[3%]"],
    ["e", "top-[28%] -left-[3%] sm:top-[28%] sm:-left-[4%] md:top-[28%] md:-left-[2%] xl:top-[25%] xl:-left-[2%]"],
    ["r", "top-[28%] -left-[3%] sm:top-[22%] sm:-left-[4%] md:top-[24%] md:-left-[2%] xl:top-[19%] xl:-left-[2.5%]"],
    ["t", "top-[28%] left-[0%] sm:top-[22%] sm:left-[0%] md:top-[24%] md:left-[0%] xl:top-[19%] xl:left-[1%]"],
    ["a", "top-[38%] -left-[3%] sm:top-[28%] sm:-left-[4%] md:top-[35%] md:-left-[3%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["s", "top-[38%] -left-[3%] sm:top-[28%] sm:-left-[4%] md:top-[35%] md:-left-[3%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["d", "top-[38%] -left-[3%] sm:top-[28%] sm:-left-[4%] md:top-[35%] md:-left-[3%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["f", "top-[38%] -left-[3%] sm:top-[30%] sm:-left-[4%] md:top-[35%] md:-left-[3%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["g", "top-[38%] left-[0%] sm:top-[30%] sm:left-[0%] md:top-[35%] md:left-[0%] xl:top-[31%] xl:left-[0%]"],
    ["z", "top-[30%] left-[2%] sm:top-[10%] sm:left-[2%] md:top-[24%] md:left-[3%] xl:top-[16%] xl:left-[2%]"],
    ["x", "top-[30%] left-[2%] sm:top-[20%] sm:left-[2%] md:top-[30%] md:left-[3%] xl:top-[20%] xl:left-[4%] xl:rotate-3"],
    ["c", "top-[30%] left-[2%] sm:top-[24%] sm:left-[2%] md:top-[30%] md:left-[3%] xl:top-[20%] xl:left-[4%] xl:rotate-3"],
    ["v", "top-[38%] -left-[7%] sm:top-[20%] sm:-left-[4%] md:top-[38%] md:-left-[6%] xl:top-[26%] xl:-left-[6%] xl:rotate-2 2xl:top-[22%] 2xl:-left-[6%]"],
    ["b", "top-[34%] -left-[4%] sm:top-[20%] sm:-left-[2%] md:top-[30%] md:-left-[4%] xl:top-[26%] xl:-left-[3%] 2xl:top-[20%] 2xl:-left-[3%]"],
    ["f_default", "top-[38%] -left-[3%] sm:top-[24%] md:top-[36%] md:-left-[3%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["left_space", "top-[38%] -left-[3%] sm:top-[24%] md:top-[36%] md:-left-[3%] xl:top-[32%] xl:top-[32%] xl:-left-[2%] 2xl:top-[35%] 2xl:-left-[3%] 2xl:-rotate-3"],
    ["shift_left", "top-[38%] -left-[3%] sm:top-[24%] sm:-left-[6%] md:top-[36%] md:-left-[5%] xl:top-[32%] xl:top-[32%] xl:-left-[5%] 2xl:top-[28%] 2xl:-left-[5%]"],
]);

export const LeftHand = React.memo(({keyToPress}) => {
    const [imgSrc, imgName, style] = React.useMemo(() => {
        let name;
        let key;
        if (keyToPress === '' || keyToPress === ' ') {
            name = "left_space";
            key = "left_space";
        } else if (LeftShiftKeys.includes(keyToPress)) {
            name = "shift_left";
            key = "shift_left";
        } else {
            name = LeftHandKeyMap.get(keyToPress);
            key = name ? keyToPress?.toLowerCase() : "f_default";
        }
        return [`static/hand/${name || "f_default"}.svg`, name, `${baseHandStyle} ${styleMap.get(key) || ''}`];
    }, [keyToPress]);

    return (
        <div>
            <img key={imgName} src={imgSrc} alt="" className={style} />
        </div>
    )
}, (prev, current) => prev.keyToPress === current.keyToPress);
