import {LeftShiftKeys, RightShiftKeys} from 'components/game/keyboard/keyInfo';
import {Key, ShiftKey} from 'components/game/keyboard/Keys';
import {LeftHand} from "components/game/keyboard/LeftHand";
import {RightHand} from "components/game/keyboard/RightHand";
import React from "react";

function Keyboard({keyToPress, showHand}) {
    return (
        <div className="w-full h-fit rounded-md bg-white shadow-md shadow-slate-200">
            <div className="flex flex-col justify-center items-center w-full space-y-1 md:space-y-[0.4rem] rounded-md relative p-1 md:p-3 mt-[0.1rem] bg-opacity-60 backdrop-filter backdrop-blur-xl bg-white/90">
                <div className="grid grid-cols-kfirst w-full gap-x-[1px] md:gap-x-1">
                    <Key key="~`" values={['~', '`']} keyToPress={keyToPress} />
                    <Key key="!1" values={['!', '1']} keyToPress={keyToPress} />
                    <Key key="@2" values={['@', '2']} keyToPress={keyToPress} />
                    <Key key="#3" values={['#', '3']} keyToPress={keyToPress} />
                    <Key key="$4" values={['$', '4']} keyToPress={keyToPress} />
                    <Key key="%5" values={['%', '5']} keyToPress={keyToPress} />
                    <Key key="^6" values={['^', '6']} keyToPress={keyToPress} />
                    <Key key="&7" values={['&', '7']} keyToPress={keyToPress} />
                    <Key key="*8" values={['*', '8']} keyToPress={keyToPress} />
                    <Key key="(9" values={['(', '9']} keyToPress={keyToPress} />
                    <Key key=")0" values={[')', '0']} keyToPress={keyToPress} />
                    <Key key="_-" values={['_', '-']} keyToPress={keyToPress} />
                    <Key key="+=" values={['+', '=']} keyToPress={keyToPress} />
                    <Key key="Delete" values={['DELETE']} textSpanStyle="block w-full pr-[4px] text-right" keyToPress={keyToPress} />
                </div>
                <div className="grid grid-cols-ksecond w-full gap-x-[1px] md:gap-x-1">
                    <Key key="tab" values={['TAB']} textSpanStyle="block w-full pl-[4px] text-left" keyToPress={keyToPress} />
                    <Key key="Q" values={['q']} keyToPress={keyToPress} />
                    <Key key="W" values={['w']} keyToPress={keyToPress} />
                    <Key key="E" values={['e']} keyToPress={keyToPress} />
                    <Key key="R" values={['r']} keyToPress={keyToPress} />
                    <Key key="T" values={['t']} keyToPress={keyToPress} />
                    <Key key="Y" values={['y']} keyToPress={keyToPress} />
                    <Key key="U" values={['u']} keyToPress={keyToPress} />
                    <Key key="I" values={['i']} keyToPress={keyToPress} />
                    <Key key="O" values={['o']} keyToPress={keyToPress} />
                    <Key key="P" values={['p']} keyToPress={keyToPress} />
                    <Key key="{]" values={['{', '[']} keyToPress={keyToPress} />
                    <Key key="}]" values={['}', ']']} keyToPress={keyToPress} />
                    <Key key="|\\" values={['|', '\\']} keyToPress={keyToPress} />
                </div>
                <div className="grid grid-cols-kthird w-full gap-x-[1px] md:gap-x-1">
                    <Key key="capslock" values={['CAPS LOCK']} textSpanStyle="block w-full pl-[4px] text-left" keyToPress={keyToPress} />
                    <Key key="A" values={['a']} keyToPress={keyToPress} />
                    <Key key="S" values={['s']} keyToPress={keyToPress} />
                    <Key key="D" values={['d']} keyToPress={keyToPress} />
                    <Key key="F" values={['f']} keyToPress={keyToPress} />
                    <Key key="G" values={['g']} keyToPress={keyToPress} />
                    <Key key="H" values={['h']} keyToPress={keyToPress} />
                    <Key key="J" values={['j']} keyToPress={keyToPress} />
                    <Key key="K" values={['k']} keyToPress={keyToPress} />
                    <Key key="L" values={['l']} keyToPress={keyToPress} />
                    <Key key=":;" values={[':', ';']} keyToPress={keyToPress} />
                    <Key key="comma" values={['\"', '\'']} keyToPress={keyToPress} />
                    <Key key="enter" values={['ENTER']} textSpanStyle="block w-full pr-[4px] text-right" keyToPress={keyToPress} />
                </div>
                <div className="grid grid-cols-kfourth w-full gap-x-[1px] md:gap-x-1">
                    <ShiftKey key="leftshift" values={["SHIFT"]} textSpanStyle="block w-full pl-[4px] text-left" keyToPress={keyToPress} associagedKeys={LeftShiftKeys} />
                    <Key key="Z" values={['z']} keyToPress={keyToPress} />
                    <Key key="X" values={['x']} keyToPress={keyToPress} />
                    <Key key="C" values={['c']} keyToPress={keyToPress} />
                    <Key key="V" values={['v']} keyToPress={keyToPress} />
                    <Key key="B" values={['b']} keyToPress={keyToPress} />
                    <Key key="N" values={['n']} keyToPress={keyToPress} />
                    <Key key="M" values={['m']} keyToPress={keyToPress} />
                    <Key key="lessthan" values={['<', ',']} keyToPress={keyToPress} />
                    <Key key="greaterthan" values={['>', '.']} keyToPress={keyToPress} />
                    <Key key="questionmark" values={['?', '/']} keyToPress={keyToPress} />
                    <ShiftKey key="rightshift" values={['SHIFT']} textSpanStyle="block w-full pr-[4px] text-right" keyToPress={keyToPress} associagedKeys={RightShiftKeys} />
                </div>
                <div className="grid grid-cols-kfifth w-full gap-x-[1px] md:gap-x-1">
                    <Key key="leftctrl" values={['CTRL']} textSpanStyle="block w-full pl-[4px] text-left" keyToPress={keyToPress} />
                    <Key key="leftalt" values={['ALT']} textSpanStyle="block w-full pl-[6px] text-left" keyToPress={keyToPress} />
                    <Key key="spacebar" values={['', " "]} keyToPress={keyToPress} />
                    <Key key="rightalt" values={['ALT']} textSpanStyle="block w-full pr-[6px] text-right" keyToPress={keyToPress} />
                    <Key key="rightctrl" values={['CTRL']} textSpanStyle="block w-full pr-[4px] text-right" keyToPress={keyToPress} />
                </div>
                {
                    showHand ?
                        <>
                            <LeftHand keyToPress={keyToPress} />
                            <RightHand keyToPress={keyToPress} />
                        </> : null
                }
            </div>
        </div >
    )
}

export default React.memo(Keyboard, (prev, current) => prev.keyToPress === current.keyToPress && prev.showHand === current.showHand);

