import {Vec} from '@nyinyithann/vec.js';
import React, {useCallback, useEffect, useRef, useState, useImperativeHandle, useMemo} from 'react';
import Letter from 'components/game/typing/Letter';
import {useGameUserStore} from 'stores';
import Keyboard from 'components/game/keyboard';

const pm_TextStyleBase = 'font-mono block text-transparent bg-clip-text bg-gradient-to-tr ' +
    'h-fit w-fit text-[0.75rem] ' +
    'sm:h-fit sm:w-fit sm:text-[1.2rem] ' +
    'md:h-fit md:w-fit md:text-[1.4rem] ' +
    'lg:h-fit lg:w-fit lg:text-[1.8rem] ' +
    'xl:h-fit xl:w-fit xl:text-[2rem] ' +
    '2xl:h-[3.4rem] 2xl:fit 2xl:text-[2.4rem] ';

const pm_BgStyleBase = "text-center rounded-sm";

const pm_NormalStyle = {
    text: `${pm_TextStyleBase} from-slate-900 via-gray-700 to-slate-500 drop-shadow`,
    bg: `${pm_BgStyleBase}`
};

const pm_SelectedStyle = {
    text: `${pm_TextStyleBase} from-sky-800 via-sky-700 to-sky-900 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-sky-500 bg-sky-400/40`
};

const pm_CorrectedStyle = {
    text: `${pm_TextStyleBase} from-green-500/80 via-green-800 to-green-500 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-transparent bg-green-200/60`
};

const pm_IncorrectedShakeXStyle = {
    text: `${pm_TextStyleBase} from-red-500/80 via-red-800 to-red-500 drop-shadow-lg`,
    bg: `${pm_BgStyleBase} border-b-[4px] border-b-red-500 bg-red-200/60 animate-shakeX`
};

function getState(lessonLines, displayLineNumber) {
    const lines = lessonLines || Vec.from([[]]);
    return {
        lines,
        displayLines: lines.slice(0, displayLineNumber),
        selectedLineIndex: 0,
        selectedPosition: 0,
    };
}

const ParagraphTypingBoard = React.forwardRef(({lessonId, lessonBonusPoints, lessonLines, displayLineNumber, notifyLessonEnd}, ref) => {

    const [state, setState] = useState(getState(lessonLines, displayLineNumber));

    const stateRef = useRef({
        lines: state.lines,
        displayLines: state.displayLines,
        selectedLineIndex: state.selectedLineIndex,
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
        const newState = getState(lessonLines, displayLineNumber);
        stateRef.current = {
            lines: newState.lines,
            displayLines: newState.displayLines,
            selectedLineIndex: newState.selectedLineIndex,
            selectedPosition: newState.selectedPosition,
        };
        setState(newState);
        window.addEventListener('keydown', keyDownListener, {capture: true});
    }, [lessonLines, displayLineNumber]);

    const lessonIdRef = React.useRef(lessonId);
    useEffect(() => lessonIdRef.current = lessonId, [lessonId]);

    const bonusPointsRef = React.useRef(lessonBonusPoints);
    useEffect(() => bonusPointsRef.current = lessonBonusPoints, [lessonBonusPoints]);

    useEffect(() => {
        window.addEventListener('keydown', keyDownListener, {capture: true});
        return () => window.removeEventListener('keydown', keyDownListener, {capture: true});
    }, []);

    const keyDownListener = useCallback((e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.activeElement.blur();
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
                lines: refLines,
                displayLines: refDisplayLines,
                selectedLineIndex: refSelectedLineIndex,
                selectedPosition: refSelectedPosition,
            } = stateRef.current;
            const currentKey = refDisplayLines[refSelectedLineIndex % displayLineNumber][refSelectedPosition]?.value;
            if (e.key.trim() === currentKey.trim()) {
                increaseXP(1, lessonIdRef.current);
                const totalLines = refLines.length;
                const lineLength = refLines[refSelectedLineIndex].length;
                if (refSelectedLineIndex + 1 === totalLines && refSelectedPosition + 1 === lineLength) {
                    window.removeEventListener('keydown', keyDownListener, {capture: true});
                    increaseXP(bonusPointsRef.current, lessonIdRef.current);
                    setTimeout(notifyLessonEnd, 200);
                } else {
                    setState((prev) => {
                        if (prev.selectedLineIndex !== 0 && (prev.selectedLineIndex + 1) % displayLineNumber === 0 && prev.selectedPosition + 1 === lineLength)/* end of currently displaying lines*/ {
                            const newState = {
                                ...prev,
                                displayLines: prev.lines.slice(prev.selectedLineIndex + 1, prev.selectedLineIndex + 1 + displayLineNumber),
                                selectedLineIndex: prev.selectedLineIndex + 1,
                                selectedPosition: 0
                            };
                            stateRef.current = {
                                lines: newState.lines,
                                displayLines: newState.displayLines,
                                selectedLineIndex: newState.selectedLineIndex,
                                selectedPosition: newState.selectedPosition,
                            };
                            return newState;
                        }
                        else {
                            const letter = prev.displayLines[prev.selectedLineIndex % displayLineNumber][prev.selectedPosition];
                            letter.style = pm_CorrectedStyle;
                            const newLineIndex = prev.selectedPosition === (lineLength - 1) ? prev.selectedLineIndex + 1 : prev.selectedLineIndex;
                            const newSelectedPosition = newLineIndex === prev.selectedLineIndex ? prev.selectedPosition + 1 : 0;
                            const newState = {
                                ...prev,
                                selectedLineIndex: newLineIndex,
                                selectedPosition: newSelectedPosition,
                            };
                            stateRef.current = {
                                lines: newState.lines,
                                displayLines: newState.displayLines,
                                selectedLineIndex: newState.selectedLineIndex,
                                selectedPosition: newState.selectedPosition,
                            };
                            return newState;
                        }
                    });
                }
            } else {
                setState(prev => {
                    const letter = prev.displayLines[prev.selectedLineIndex % displayLineNumber][prev.selectedPosition];
                    letter.style = pm_IncorrectedShakeXStyle;
                    letter.cheatKey = Math.random(6); // just to cheat React to render everytime style is changed
                    return {...prev};
                });
            }
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <div className='h-fit ring-0 outline-none grid grid-cols-1 auto-rows-fr content-center px-[2px] lg:px-[12px] py-2 gap-y-[4px] rounded bg-opacity-60 backdrop-filter backdrop-blur-md bg-white/30 shadow-md shadow-200/40'>
                {
                    state.displayLines.map(l => {
                        return (
                            l.length > 0 ?
                                <div key={l[0].line} className="h-fit ring-0 outline-none grid grid-cols-50 auto-rows-fr content-center border-b-[2px] border-b-slate-300 pb-[4px]">
                                    {
                                        l.map(n => {
                                            return (
                                                <Letter
                                                    key={`paragraph_${n.position}_${n.value}_${n.cheatKey || ''}`}
                                                    value={n.value}
                                                    style={n.style ? n.style : n.line === state.selectedLineIndex && n.position === state.selectedPosition ? pm_SelectedStyle : pm_NormalStyle}
                                                />
                                            );
                                        })
                                    }
                                </div> : null
                        );
                    })
                }
            </div>
            <Keyboard keyToPress={state.displayLines && state.displayLines.length > 0 ? state.displayLines[state.selectedLineIndex % displayLineNumber][state.selectedPosition]?.value : undefined} />
        </div>
    );
});

export default ParagraphTypingBoard;
