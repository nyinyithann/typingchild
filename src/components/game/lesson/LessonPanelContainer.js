import {Tab} from '@headlessui/react';
import {Vec} from '@nyinyithann/vec.js';
import DefaultLessonPanel from 'components/game/lesson/DefaultLessonPanel';
import React, {useEffect, useState} from 'react';
import {lessonStoreSelector, useLessonStore} from 'stores';

const getParentTabHeaderStyle = (isSelected) => {
    const style = 'py-1 px-4 leading-5 text-900 w-[14rem] mt-1 bg-200/40 rounded-t-xl border-[1px] border-100 ring-0 outline-none invisible';
    return `${style} ${isSelected ? 'border-300 border-b-0 bg-400/70 text-900 ring-0 outline-none' : ''}`;
}

const getTabHeaderStyle = (isSelected) => {
    const style = 'px-4 leading-5 text-900 w-30 ring-0 outline-none dark:text-gray-200';
    return `${style} ${isSelected ? 'border-b-2 border-b-400 ring-0 outline-none dark:border-b-gray-400' : ''}`;
};

function LessonPanelContainer({canLoad, onLessonSelect, selectedLessonId}) {
    const [lessonGroups, setLessonGroups] = useState([]);
    const {defaultLessons, selectedLesson} = useLessonStore(lessonStoreSelector);
    const [selectedTabIndex, setSelectedTabIndex] = useState();

    useEffect(async () => {
        if (canLoad) {
            const groupsByCategory = Vec.from(defaultLessons).groupBy(l => l.category);
            try {
                groupsByCategory.sort(([kx, _], [ky, __]) => parseInt(kx) - parseInt(ky));
            } catch{}
            const index = groupsByCategory.findIndex(([key, _]) => key === selectedLesson.category);
            setSelectedTabIndex(index > -1 ? index : 0);
            setLessonGroups(groupsByCategory);
        }
    }, [canLoad]);

    return (
        <Tab.Group>
            <Tab.List className="flex space-x-1 px-1 text-base w-full ring-0 outline-none invisible h-0">
                <Tab className={({selected}) => getParentTabHeaderStyle(selected)}>
                    Default
                </Tab>
                <Tab className={({selected}) => getParentTabHeaderStyle(selected)}>
                    Create Your Lessons
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel as="div" className="flex flex-col">
                    <Tab.Group defaultIndex={selectedTabIndex}>
                        <Tab.List className="flex space-x-1 mx-1 p-1 rounded-sm text-[0.9rem] bg-white ring-0 outline-none dark:bg-gray-700 dark:border-gray-700">
                            {
                                lessonGroups.map(([key, _]) => (<Tab key={key} className={({selected}) => getTabHeaderStyle(selected)}>{key.slice(1)}</Tab>))
                            }
                        </Tab.List>
                        <Tab.Panels>
                            {
                                lessonGroups.map(([key, values]) => (
                                    <Tab.Panel as="div" key={key} className="flex h-[calc(100vh-24rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-20rem)] xl:h-[calc(100vh-16rem)] overflow-y-auto mr-2 ring-0 outline-none xl:mt-1 lesson-scrollbar dark:dark-scrollbar">
                                        <DefaultLessonPanel lessons={values} onLessonSelect={onLessonSelect} selectedLessonId={selectedLessonId} />
                                    </Tab.Panel>
                                ))
                            }
                        </Tab.Panels>
                    </Tab.Group>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}

export default LessonPanelContainer;
