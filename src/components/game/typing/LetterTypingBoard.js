import {Vec} from '@nyinyithann/vec.js';
import React, {useCallback, useEffect, useRef, useState, useImperativeHandle} from 'react';
import Letter from 'components/game/typing/Letter';
import {useGameUserStore} from 'stores';
import Keyboard from 'components/game/keyboard';

const lm_TextStyleBase = 'font-typing block text-center text-transparent bg-clip-text bg-gradient-to-tr ' +
    'h-[2rem] w-[2rem] text-[1.6rem] ' +
    'sm:h-[2rem] sm:w-[2rem] sm:text-[2rem] ' +
    'md:h-[4.6rem] md:w-[4.6rem] md:text-[3.2rem] ' +
    'lg:h-[5.9rem] lg:w-[5.9rem] lg:text-[3.8rem] ' +
    'xl:h-[5.9rem] xl:w-[5.9rem] xl:text-[4rem] ' +
    '2xl:h-[8rem] 2xl:w-[8rem] 2xl:text-[5.4rem]';
const lm_BgStyleBase = "flex items-center justify-center border-[2px] rounded-md";
const lm_NormalStyle = {
    text: `${lm_TextStyleBase} from-slate-500 to-gray-600 drop-shadow brightness-125 dark:text-gray-500`,
    bg: `${lm_BgStyleBase} border-300/90 dark:border-gray-600`
};
const lm_SelectedStyle = {
    text: `${lm_TextStyleBase} from-sky-800 via-sky-700 to-sky-900 drop-shadow-lg brightness-125 dark:text-gray-100`,
    bg: `${lm_BgStyleBase} bg-sky-400/60 border-sky-500/90`
};
const lm_CorrectedStyle = {
    text: `${lm_TextStyleBase} from-green-400/30 via-green-400/80 to-green-400/30 drop-shadow-lg brightness-50 dark:text-gray-500`,
    bg: `${lm_BgStyleBase} bg-green-400/60 border-green-500/90`
};
const lm_IncorrectedShakeXStyle = {
    text: `${lm_TextStyleBase} from-red-400/30 via-red-400/80 to-red-400/30 drop-shadow-lg brightness-50 dark:text-gray-600`,
    bg: `${lm_BgStyleBase} border-red-500/90 bg-red-700/60 animate-shakeX`
};

function getState(lessonLines) {
    const lines = lessonLines || Vec.from([[]]);
    const headLine = lines.head();
    return {
        lines,
        headLine,
        selectedLineIndex: 0,
        selectedPosition: 0,
        pressedKey: undefined,
    };
}

const LetterTypingBoard = React.forwardRef(({lessonId, lessonBonusPoints, lessonLines, notifyLessonEnd, notifyWhichKey, showHand, showKeyboard}, ref) => {
    const [state, setState] = useState(getState(lessonLines));
    const stateRef = useRef({
        headLine: state.headLine,
        selectedPosition: state.selectedPosition,
    });

    const increaseXP = useGameUserStore(state => state.increaseXP);

    useImperativeHandle(ref, () => ({
        attachKeyEvent() {
            window.addEventListener('keydown', keyDownListener, {capture: true});
        },
        detachKeyEvent() {
            window.removeEventListener('keydown', keyDownListener, {capture: true});
        }
    }));

    useEffect(() => {
        const newState = getState(lessonLines);
        stateRef.current = {
            headLine: newState.headLine,
            selectedPosition: newState.selectedPosition,
        };
        setState(newState);
        window.addEventListener('keydown', keyDownListener, {capture: true});
    }, [lessonLines]);

    const lessonIdRef = React.useRef(lessonId);
    useEffect(() => lessonIdRef.current = lessonId, [lessonId]);

    const bonusPointsRef = React.useRef(lessonBonusPoints);
    useEffect(() => bonusPointsRef.current = lessonBonusPoints, [lessonBonusPoints]);

    useEffect(() => {
        let timeOutId = null;
        if (state.selectedPosition !== 0 && state.headLine?.length !== 0 &&
            state.selectedPosition === state.headLine?.length /* end of current lesson line */) {
            window.removeEventListener('keydown', keyDownListener, {capture: true});
            const isEndOfLesson = state.selectedLineIndex + 1 === state.lines.length;
            if (isEndOfLesson) {
                increaseXP(bonusPointsRef.current, lessonIdRef.current);
                timeOutId = setTimeout(notifyLessonEnd, 200);
            } else {
                timeOutId = setTimeout(() => {
                    window.addEventListener('keydown', keyDownListener, {capture: true});
                    setState((prev) => {
                        const nextTargetIndex = prev.selectedLineIndex + 1;
                        const nextHeadLine = prev.lines.get(nextTargetIndex);
                        const newState = {
                            ...prev,
                            selectedLineIndex: nextTargetIndex,
                            selectedPosition: 0,
                            headLine: nextHeadLine,
                        };
                        stateRef.current = {
                            headLine: newState.headLine,
                            selectedPosition: newState.selectedPosition,
                        };
                        return newState;
                    });
                }, 200);
            }
        }
        return () => clearTimeout(timeOutId);
    }, [state.selectedPosition]);

    useEffect(() => {
        window.addEventListener('keydown', keyDownListener, {capture: true});
        return () => window.removeEventListener('keydown', keyDownListener, {capture: true});
    }, []);

    const keyDownListener = useCallback((e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.activeElement.blur();
        notifyWhichKey(e);
        const {key} = e;
        if (
            key.length === 1 &&
            ((key >= 'a' && key <= 'z') ||
                (key >= 'A' && key <= 'Z') ||
                (key >= '0' && key <= '9') ||
                e.code === 'Space' ||
                e.code === 'BracketLeft' ||
                e.code === 'BracketRight' ||
                e.code === 'Backslash' ||
                e.code === 'Semicolon' ||
                e.code === 'Quote' ||
                e.code === 'Comma' ||
                e.code === 'Period' ||
                e.code === 'Slash' ||
                e.code === 'Backquote' ||
                e.code === 'Minus' ||
                e.code === 'Equal' ||
                e.code === 'Digit0' ||
                e.code === 'Digit1' ||
                e.code === 'Digit2' ||
                e.code === 'Digit3' ||
                e.code === 'Digit4' ||
                e.code === 'Digit5' ||
                e.code === 'Digit6' ||
                e.code === 'Digit7' ||
                e.code === 'Digit8' ||
                e.code === 'Digit9'
            )
        ) {
            const {
                headLine: refHeadLine,
                selectedPosition: refSelectedPosition,
            } = stateRef.current;
            const currentKey =
                refSelectedPosition < refHeadLine.length
                    ? refHeadLine[refSelectedPosition].value
                    : '　'; /* unicode space */
            const pressedKey = key.trim();
            if (pressedKey === currentKey.trim()) {
                increaseXP(1, lessonIdRef.current);
                setState((prev) => {
                    const letter = prev.headLine[prev.selectedPosition];
                    letter.style = lm_CorrectedStyle;
                    const newSelectedPosition = prev.selectedPosition + 1;
                    const newState = {
                        ...prev,
                        selectedPosition: newSelectedPosition,
                        pressedKey
                    };
                    stateRef.current = {
                        headLine: newState.headLine,
                        selectedPosition: newState.selectedPosition,
                    };
                    return newState;
                });
            } else {
                setState((prev) => {
                    const letter = prev.headLine[prev.selectedPosition];
                    letter.style = lm_IncorrectedShakeXStyle;
                    letter.cheatKey = Math.random(6); // just to cheat React to render everytime style is changed
                    return {...prev, pressedKey};
                });
            }
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center space-y-4 xl:mt-[2rem] xl:space-y-[2.8rem]">
            <div className='h-fit ring-0 outline-none grid grid-cols-9 grid-rows-2 gap-1 md:gap-2 content-center px-3'>
                {state.headLine?.map((t) => {
                    return (
                        <Letter
                            key={`letter_${t.position}${t.cheatKey || ''}`}
                            value={t.value}
                            style={t.style ? t.style : t.position === state.selectedPosition ? lm_SelectedStyle : lm_NormalStyle}
                        />
                    );
                })}
            </div>
            {
                showKeyboard
                    ? <Keyboard keyToPress={state.headLine ? state.headLine[state.selectedPosition]?.value : undefined} showHand={showHand} />
                    : null
            }
        </div>
    );
});

export default LetterTypingBoard;
