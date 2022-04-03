import React from 'react';

function ScoreBox({level, xp, levelXP}) {
    return (
        <div
            role="score"
            className="border-primary bg-primary flex w-fit items-center justify-center space-x-4 rounded-md px-2 py-1 text-900 text-base dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
        >
            <span className="text-top align-text-top text-600">Level</span>
            <span className="border-secondary bg-secondary inline-block rounded-md p-1 px-2 text-right text-600 md:w-[6rem] dark:border-gray-700 dark:bg-gray-700">
                {level}
            </span>
            <span className="text-top align-text-top text-600">Points</span>
            <div className="border-secondary bg-secondary rounded-md p-1 md:w-[10rem] flex items-center justify-end dark:border-gray-700 dark:bg-gray-700">
                <span className="inline-block rounded-md text-right text-600">
                    {xp}
                </span>
                <span className="inline-block place-self-start text-600">
                    /
                </span>
                <span className="inline-block rounded-md text-600">
                    {levelXP}
                </span>
            </div>
        </div>
    );
}

export default React.memo(ScoreBox);
