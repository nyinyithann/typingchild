import {LETTER_MODE, PARAGRAPH_MODE} from 'components/game/typing/lessonModes';
const lm_TextStyleBase = 'font-typing block text-center text-transparent bg-clip-text bg-gradient-to-tr ' +
    'h-[2rem] w-[2rem] text-[1.6rem] ' +
    'md:h-[5rem] md:w-[5rem] md:text-[3.8rem] ' +
    'xl:h-[5rem] xl:w-[5rem] xl:text-[3.6rem] ' +
    '2xl:h-[7rem] 2xl:w-[5.6rem] 2xl:text-[5.3rem]';
const lm_BgStyleBase = "flex items-center justify-center border-[1px] rounded-md";
const lm_NormalStyle = {
    text: `${lm_TextStyleBase} from-slate-500 to-gray-600 drop-shadow brightness-125`,
    bg: `${lm_BgStyleBase} border-300/90 bg-transparent`
};
const lm_SelectedStyle = {
    text: `${lm_TextStyleBase} from-yellow-800 via-yellow-700 to-yellow-900 drop-shadow-lg brightness-125`,
    bg: `${lm_BgStyleBase} border-b-[1px] border-b-yellow-900 bg-yellow-400/60 animate-blink_cursor`
};
const lm_CorrectedStyle = {
    text: `${lm_TextStyleBase} from-green-400/30 via-green-400/80 to-green-400/30 drop-shadow-lg brightness-50`,
    bg: `${lm_BgStyleBase} border-green-400/60 bg-green-400/60`
};
const lm_IncorrectedStyle = {
    text: `${lm_TextStyleBase} from-red-400/30 via-red-400/80 to-red-400/30 drop-shadow-lg brightness-50`,
    bg: `${lm_BgStyleBase} border-[1px] border-red-400/60 bg-red-700/60`
};

const pm_TextStyleBase = 'font-mono block text-transparent bg-clip-text bg-gradient-to-tr ' +
    'h-[1.4rem] w-[0.6rem] text-[1rem] ' +
    'md:h-[3rem] md:w-[1.21rem] md:text-[2rem] ' +
    'xl:h-[3rem] xl:w-[1.13rem] xl:text-[1.9rem] ' +
    '2xl:h-[3.4rem] 2xl:w-[1.5rem] 2xl:text-[2.4rem] ';

const pm_BgStyleBase = "text-center rounded-sm first:mt-1";
const pm_NormalStyle = {
    text: `${pm_TextStyleBase} from-slate-900 via-gray-700 to-slate-500 drop-shadow`,
    bg: `${pm_BgStyleBase} border-b-[1px] border-b-slate-300/60`
};
const pm_SelectedStyle = {
    text: `${pm_TextStyleBase} from-yellow-700 via-yellow-600 to-yellow-700 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-yellow-500 bg-yellow-400/40`
};
const pm_CorrectedStyle = {
    text: `${pm_TextStyleBase} from-green-500/80 via-green-800 to-green-500 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-transparent bg-green-200/60`
};
const pm_IncorrectedStyle = {
    text: `${pm_TextStyleBase} from-red-500/80 via-red-800 to-red-500 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-transparent bg-red-200/60`
};

export function getNormalStyle(lessonMode) {
    if (lessonMode === LETTER_MODE) {
        return lm_NormalStyle;
    }
    if (lessonMode === PARAGRAPH_MODE) {
        return pm_NormalStyle;
    }
}
export function getSelectedStyle(lessonMode) {
    if (lessonMode === LETTER_MODE) {
        return lm_SelectedStyle;
    }
    if (lessonMode === PARAGRAPH_MODE) {
        return pm_SelectedStyle;
    }
}
export function getCorrectedStyle(lessonMode) {
    if (lessonMode === LETTER_MODE) {
        return lm_CorrectedStyle;
    }
    if (lessonMode === PARAGRAPH_MODE) {
        return pm_CorrectedStyle;
    }
}
export function getIncorrectedStyle(lessonMode) {
    if (lessonMode === LETTER_MODE) {
        return lm_IncorrectedStyle;
    }
    if (lessonMode === PARAGRAPH_MODE) {
        return pm_IncorrectedStyle;
    }
}

