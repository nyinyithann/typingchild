import {Vec} from '@nyinyithann/vec.js';
import LessonDialog from 'components/game/lesson/LessonDialog';
import ScoreBox from 'components/game/ScoreBox';
import ToastPanel from 'components/game/ToastPanel';
import {LETTER_MODE, PARAGRAPH_MODE} from 'components/game/typing/lessonModes';
import LetterTypingBoard from 'components/game/typing/LetterTypingBoard';
import LevelUpDialog from 'components/game/typing/LevelUpDialog';
import ParagraphTypingBoard from 'components/game/typing/ParagraphTypingBoard';
import ErrorDialog from 'components/housekeeping/ErrorDialog';
import Loading from 'components/housekeeping/Loading';
import React, {useEffect, useRef, useState} from "react";
import toast, {Toaster} from 'react-hot-toast';
import {useAuth} from 'services/firebase/auth';
import {gameUserStoreSelector, lessonStoreSelector, useGameUserStore, useLessonStore} from 'stores';
import Toggle from 'components/game/Toggle';

const lettersPerLine = 9;
const linesPerSession = 2;
const sessionsPerLesson = 2;
const maxLettersPerLine = 50;

const getMode = (content) => {
  return content && content.length > (lettersPerLine * linesPerSession) ? PARAGRAPH_MODE : LETTER_MODE
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function convertToLetterLesson(lessonContent) {
  if (!lessonContent || lessonContent.length === 0) {
    return Vec.empty();
  }
  const letters = Vec.empty();
  const space = '';
  let tempLesson = new Vec();
  switch (lessonContent.length) {
    case 1:
      const [hd] = lessonContent;
      tempLesson.push(hd, hd, hd, hd);
      break;
    case 2:
      const [fst, snd] = lessonContent;
      tempLesson.push(fst, snd, fst, snd);
      break;
    case 3:
      const [first, second, thd] = lessonContent;
      tempLesson.push(first, second, thd, first);
      break;
    default:
      tempLesson = Vec.from(lessonContent);
      break;
  }
  const windowVec = new Vec();
  for (let i = 0; i < 40; i++) {
    if (tempLesson.length > 3) {
      const [fst, snd] = tempLesson.splitAt(getRandomInt(3));
      windowVec.push(...fst, ...snd, ...fst, space);
    }
  }

  const letterLines = [
    ...windowVec
      .windowed(lettersPerLine * linesPerSession)
      .filter((l) => l.head() !== space && l.last() !== space)
      .take(sessionsPerLesson),
  ];

  let index = 0;
  for (const line of letterLines) {
    const vec = Vec.empty();
    for (let i = 0; i < line.length; i++) {
      const letter = line[i];
      vec.push({
        position: i,
        value: letter,
      });
    }
    letters.set(index++, vec);
  }
  return letters;
}

function convertToParagraphLesson(lessonContent) {
  if (!lessonContent || lessonContent.length === 0) {
    return Vec.empty();
  }
  const letters = Vec.empty();
  const lines = lessonContent.split("<br/>").filter(x => x !== '');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].slice(0, maxLettersPerLine);
    const vec = Vec.empty();
    for (let j = 0; j < line.length; j++) {
      const letter = line[j];
      vec.push({
        line: i,
        position: j,
        value: letter,
      });
    }
    letters.set(i, vec);
  }
  return letters;
}

export default function GameBoard() {
  const keyEventRef = useRef();
  const {loggingIn, authUser} = useAuth();
  const {
    loading: gameUserLoading,
    error: gameUserError,
    gameUser,
    loadGameUser,
    saveGameUser,
    resetGameUser,
    resetError: gameUserResetError,
    updateLastLessonId}
    = useGameUserStore(gameUserStoreSelector);
  const {level, xp, levelXP, startLevel, lastLessonId} = gameUser;

  const {
    loading: defaultLessonLoading,
    error: defaultLessonError,
    defaultLessons,
    userLessons,
    selectedLesson,
    loadLessons,
    setSelectedLesson,
    setSelectedLessonById,
    resetError: defaultLessonResetError,
    getNextLessonId
  } = useLessonStore(lessonStoreSelector);

  const [letterLessonLines, setLetterLessonLines] = useState(Vec.empty());
  const [paragraphLessonLines, setParagraphLessonLines] = useState(Vec.empty());

  const [levelUpDialogOpen, setLevelUpDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);

  const [notifiable, setNotifiable] = useState(false);
  const [notiClose, setNotiClose] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showHand, setShowHand] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const selectedLessonIdRef = useRef();
  selectedLessonIdRef.current = selectedLesson.id;
  const selectedLessonBonusPoints = useRef();
  selectedLessonBonusPoints.current = selectedLesson.bonusPoints;

  useEffect(async () => {
    await loadLessons();
  }, []);

  useEffect(() => {
    let interval;
    if (authUser.uid) {
      interval = setInterval(async () => {
        await saveGameUser();
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [authUser.uid]);

  useEffect(async () => {
    if (authUser?.uid) {
      await loadGameUser(authUser.uid);
    } else {
      resetGameUser();
    }
  }, [authUser]);

  useEffect(() => {
    setSelectedLessonById(lastLessonId);
    selectedLessonIdRef.current = lastLessonId;
  }, [lastLessonId, defaultLessons]);

  useEffect(async () => {
    selectedLessonBonusPoints.current = selectedLesson.bonusPoints;
    const mode = getMode(selectedLesson.content);
    if (mode === LETTER_MODE) {
      const letterLines = convertToLetterLesson(selectedLesson.content);
      setLetterLessonLines(letterLines);
    }
    if (mode === PARAGRAPH_MODE) {
      const paragraphLines = convertToParagraphLesson(selectedLesson.content);
      setParagraphLessonLines(paragraphLines);
    }

    if (authUser?.uid) {
      await saveGameUser();
    }
  }, [selectedLesson, setLetterLessonLines]);

  useEffect(async () => {
    if (level !== startLevel) {
      keyEventRef.current?.detachKeyEvent();
      setLevelUpDialogOpen(true);
      if (authUser?.uid) {
        await saveGameUser();
      }
    }
  }, [level, startLevel])

  useEffect(() => {
    if (authUser.uid) {
      setNotifiable(false);
    }
    else if (xp > 0 && !authUser.uid) {
      setNotifiable(true);
    } else {
      setNotifiable(false);
    }
  }, [xp, authUser.uid]);

  const notifyLessonEnd = React.useCallback(() => {
    const bonusPoints = selectedLessonBonusPoints.current;
    toast.custom((t) => (
      <ToastPanel toast={t} showThumb={true} info={['You just finished a lesson.', `You earned ${bonusPoints} bonus points for finishing the lesson.`]} />
    ));
    const nextLessonId = getNextLessonId(selectedLessonIdRef.current);
    updateLastLessonId(nextLessonId);
  }, []);

  const openLessonDialog = React.useCallback(() => {
    keyEventRef.current?.detachKeyEvent();
    setLessonDialogOpen(true);
  }, [keyEventRef.current]);

  const closeLessonDialog = React.useCallback(() => {
    keyEventRef.current?.attachKeyEvent();
    setLessonDialogOpen(false);
  }, [keyEventRef.current]);

  const handleSelectLesson = React.useCallback((lessonId) => {
    updateLastLessonId(lessonId);
    closeLessonDialog();
  }, []);

  const handleLevelupDialogClose = React.useCallback(() => {
    keyEventRef.current?.attachKeyEvent();
    setLevelUpDialogOpen(false);
  }, [keyEventRef.current]);

  const notifyWhichKey = React.useCallback((event) => {
    event.getModifierState("CapsLock")
      ? setCapsLockOn(true)
      : setCapsLockOn(false);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col py-[1rem] sm:py-20 md:py-[2rem] xl:py-[2.5rem]">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          width: '50rem',
          margin: '2rem 0 0 0',
        },
      }} />
      <div className="grid auto-rows-min content-center gap-4 px-4 md:px-[4rem] xl:px-[16rem] 2xl:px-[22rem]">
        <div className="flex w-full space-x-1 text-lg h-fit">
          <ScoreBox level={level} xp={xp} levelXP={levelXP} />
          <div className="flex-1 flex items-center justify-start space-x-4 invisible lg:visible xl:pl-4">
            <Toggle className="flex items-center justify-center space-x-1" checked={showHand} onChange={setShowHand}>
              <Toggle.Icon>
                <div className="flex items-center justify-center">
                  <img src="static/images/f.png" alt="" className="h-[2rem] w-[1.5rem]" />
                  <img src="static/images/j.png" alt="" className="ml-[-5px] h-[2rem] w-[1.5rem]" />
                </div>
              </Toggle.Icon>
            </Toggle>
            <Toggle className="flex items-center justify-center space-x-1" checked={showKeyboard} onChange={setShowKeyboard}>
              <Toggle.Icon>
                <div className="flex items-center justify-center">
                  <img src="static/images/kb.png" alt="" className="h-[1.8rem] w-[3rem]" />
                </div>
              </Toggle.Icon>
            </Toggle>
          </div>
          <div className="flex justify-end">
            <button
              disabled={levelUpDialogOpen}
              type="button"
              className={`btn-primary px-4 h-fit py-[8.6px] md:px-9 text-base ${levelUpDialogOpen ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={openLessonDialog}
            >Lessons</button>
          </div>
        </div>
        <div className={`invisible w-0 h-0 md:w-full md:h-fit md:py-1 bg-gradient-to-tr from-red-300/30 to-pink-300/30 flex items-center border-b-2 border-b-red-600 animate-blink_cursor ${notifiable && !notiClose ? 'md:visible' : 'md:hidden'}`}>
          <p className="font-sans text-900 drop-shadow-md px-4">Please login to save your levels and points.</p>
          <button
            type="button"
            className="ml-auto block rounded-full p-1 ring-0 outline-none mr-4 bg-red-200"
            onClick={() => setNotiClose(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={`invisible w-0 h-0 md:w-full md:h-fit md:py-1 bg-gradient-to-tr from-red-300/30 to-pink-300/30 flex items-center border-b-2 border-b-red-600 animate-blink_cursor ${capsLockOn ? 'md:visible' : 'md:hidden'}`}>
          <p className="font-sans text-900 drop-shadow-md px-4">Your Caps Lock key is on. Please turn it off.</p>
        </div>
        {
          getMode(selectedLesson.content) === LETTER_MODE
            ? <LetterTypingBoard ref={keyEventRef} lessonId={selectedLesson.id} lessonBonusPoints={selectedLesson.bonusPoints} lessonLines={letterLessonLines} notifyLessonEnd={notifyLessonEnd} notifyWhichKey={notifyWhichKey} showHand={showHand} showKeyboard={showKeyboard} />
            : <ParagraphTypingBoard ref={keyEventRef} lessonId={selectedLesson.id} lessonBonusPoints={selectedLesson.bonusPoints || 0} lessonLines={paragraphLessonLines} displayLineNumber={4} notifyLessonEnd={notifyLessonEnd} notifyWhichKey={notifyWhichKey} showHand={showHand} showKeyboard={showKeyboard} />
        }
      </div>
      <LevelUpDialog level={level} isOpen={levelUpDialogOpen} onClose={handleLevelupDialogClose} />
      <LessonDialog isOpen={lessonDialogOpen} onClose={closeLessonDialog} onOk={handleSelectLesson} selectedLessonId={selectedLesson.id} />
      <Loading loading={loggingIn || gameUserLoading || defaultLessonLoading} />
      {
        gameUserError ?
          <ErrorDialog error={gameUserError} resetError={gameUserResetError} />
          : defaultLessonError ?
            <ErrorDialog error={defaultLessonError} resetError={defaultLessonResetError} />
            : null
      }
    </div >
  )
}
