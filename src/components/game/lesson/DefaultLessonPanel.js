import React, {useState, useMemo} from "react";
import {Vec} from '@nyinyithann/vec.js';

function Tick() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rounded-full bg-white fill-blue-500" viewBox="0 0 20 20" >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    );
}

function LessonInfo({label, value}) {
    return (
        <div className="flex items-center justify-start text-[0.7rem] w-full py-[1px] border-t-[1px] border-t-200 bg-gradient-to-r from-100/40 via-100/60 to-50/90 text-900">
            <div className="flex items-center justify-start ml-6 w-1/2">
                <span className="inline-block w-[8rem] text-left">{label}</span>
                <span className="text-right w-[3rem]">{value}</span>
            </div>
        </div>
    );
}

function LessonItem({lesson, onLessonSelect, selectedLessonId}) {

    const handleClick = (e) => {
        e.preventDefault();
        onLessonSelect(lesson.id, false);
    };
    const handleDoubleClick = (e) => {
        e.preventDefault();
        onLessonSelect(lesson.id, true);
    };
    return (
        <>
            {
                lesson.content.length > 8 ?
                    <div className={`flex flex-wrap items-center justify-start border-[1px] border-200 ring-0 outline-none active:outline-none hover:bg-100 hover:cursor-pointer shadow rounded-[1px] mx-8 w-[94%] first:mt-[0.8rem] first:ml-[2rem] relative ${selectedLessonId === lesson.id ? 'bg-100 text-slate-700' : 'text-slate-600'}`} onClick={handleClick} onDoubleClick={handleDoubleClick}>
                        <div className="flex flex-wrap px-2 space-x-1">
                            {
                                <p className="first:px-1 py-2 text-left text-sm">
                                    {lesson.content.split('<br/>').reduce((acc, y) => `${acc ? `${acc} ` : ''}${y}`, '')}
                                </p>
                            }
                        </div>
                        <span className={`absolute -top-2 -right-2 bg-transparent ${selectedLessonId === lesson.id ? 'visible' : 'invisible'}`}>
                            <Tick />
                        </span>
                        <LessonInfo label="Bonus Points" value={lesson.bonusPoints} />
                        <LessonInfo label="Practiced" value={0} />
                    </div>
                    :
                    <div className={`flex flex-col flex-wrap items-center justify-center border-[1px] border-200 ring-0 outline-none active:outline-none hover:bg-100 hover:cursor-pointer shadow rounded-[1px] first:mt-[0.8rem] first:ml-[2rem] ${selectedLessonId === lesson.id ? 'bg-100' : ''}`} onClick={handleClick} onDoubleClick={handleDoubleClick}>
                        <ul className={`flex flex-wrap items-center justify-center space-y-1 text-base text-900 w-56 p-2 pb-3 relative ${lesson.content.length < 5 ? 'space-x-2' : 'space-x-[1px]'}`} >
                            {
                                Array.from(lesson.content).map((x, i) => (
                                    <li key={`${x}_${i}`} className="block flex-none w-[1.4rem] h-[1.5rem] rounded-md border-[1px] border-slate-400 bg-white text-slate-500 first:mt-1 font-lesson text-sm text-center">
                                        <span className="block w-[1.4rem] h-[1.4rem]">{x}</span>
                                    </li>
                                ))
                            }
                            <span className={`absolute -top-3 -right-2 bg-transparent ${selectedLessonId === lesson.id ? 'visible' : 'invisible'}`}>
                                <Tick />
                            </span>
                        </ul>
                        <LessonInfo label="Bonus Points" value={lesson.bonusPoints} />
                        <LessonInfo label="Practiced" value={0} />
                    </div>
            }
        </>
    );
}

function LessonItemList({title, lessons, onLessonSelect, selectedLessonId}) {
    const [sortedLessons, setSortedLessons] = useState([]);

    useMemo(() => {
        lessons.sort((x, y) => x.id - y.id);
        setSortedLessons(lessons);
    }, lessons);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {title ?
                <div className="flex-1 flex flex-col w-full mt-[1rem] pb-1 px-4 items-start justify-start">
                    <span className="block text-[0.8rem] text-800 w-fit pl-3 pr-10 bg-100 rounded-tl-2xl rounded-br-2xl rounded-bl-sm rounded-tr-sm border-[1px] border-b-0 border-r-0 border-300/60">{title}</span>
                    <span className="block w-full border-b-[1px]  border-b-300/60 rounded-bl-full -mt-[1px]" />
                </div> : null
            }
            <div className="flex flex-wrap items-start justify-start space-x-[2rem] space-y-[1rem] pl-[6px] w-[98%]">
                {
                    sortedLessons.map(l => <LessonItem key={l.id} lesson={l} onLessonSelect={onLessonSelect} selectedLessonId={selectedLessonId} />)
                }
            </div>
        </div>
    )
}

function DefaultLessonPanel({lessons, onLessonSelect, selectedLessonId}) {
    const [sortedLessonGroups, setSortedLessongroups] = useState(Vec.empty());

    useMemo(() => {
        let groupsByTitle = Vec.from(lessons).groupBy(l => l.title);
        groupsByTitle.sort(([tx, _], [ty, __]) => {
            try {
                if (tx && ty) {
                    const nx = parseInt(tx.split('#')[0]);
                    const ny = parseInt(ty.split('#')[0]);
                    return nx - ny;
                }
                return 0;
            } catch {
                return 0
            }
        });
        try {
            groupsByTitle = groupsByTitle.map(([key, value]) => {
                return [key.split('#')[1], value];
            });
        } catch {}
        setSortedLessongroups(groupsByTitle);
    }, lessons);

    return (
        <div className="flex flex-col items-center justify-center w-full h-fit pb-2">
            {
                sortedLessonGroups.map(([key, values], i) => <LessonItemList key={`${key}_${i}`} title={key} lessons={values} onLessonSelect={onLessonSelect} selectedLessonId={selectedLessonId} />)
            }
        </div>
    );
}

export default DefaultLessonPanel;

