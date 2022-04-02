import create from 'zustand';
import {getGameUser, addGameUser} from 'services/firebase/db';
import {constructError, ERROR_TO_DISPLAY} from "util";

export const defaultGameUser = {
  uid: undefined,
  level: 0,
  xp: 0,
  levelXP: 36,
  lastLessonId: 0,
  startLevel: 0,
  practicedLessons: {}
};

export const gameUserStoreSelector = ({
  loading,
  error,
  isDirty,
  gameUser,
  loadGameUser,
  resetGameUser,
  resetError,
  increaseXP,
  updateLastLessonId,
  updatePracticedLesson,
  getPracticedTimes,
  saveGameUser
}) => ({
  loading,
  error,
  isDirty,
  gameUser,
  loadGameUser,
  resetGameUser,
  resetError,
  increaseXP,
  updateLastLessonId,
  updatePracticedLesson,
  getPracticedTimes,
  saveGameUser
});

const useGameUserStore = create((set, get) => ({
  gameUser: defaultGameUser,
  loading: false,
  error: null,
  isDirty: false,

  resetError: () => {
    set(({gameUser}) => ({gameUser, error: null, loading: false, isDirty: false}))
  },

  loadGameUser: async (uid) => {
    if (uid) {
      try {
        set(({gameUser, error}) => ({gameUser, error, loading: true, isDirty: false}));
        const resp = await getGameUser(uid);
        let user;
        if (resp) {
          user = resp ? {...resp, startLevel: resp.level} : defaultGameUser;
        } else {
          /* resp is undefined if a new user logs in for the very first time */
          user = {...defaultGameUser, uid};
        }
        set({gameUser: user, error: null, loading: false, isDirty: false});
      } catch (e) {
        const errMsg = "An error occured while loading data from the server. Please reload the page after closing the dialog.";
        const error = constructError(ERROR_TO_DISPLAY, errMsg, e.message);
        set(({gameUser}) => ({gameUser, error, loading: false, isDirty: false}))
      }
    }
  },

  resetGameUser: () => set({gameUser: defaultGameUser, error: null, loading: false, isDirty: false}),

  increaseXP: (increment, lessonId) => set(({gameUser: prev}) => {
    const xpPlus = prev.xp + increment;
    const newXP = xpPlus % prev.levelXP;
    const currentLevelCheck = Math.floor(xpPlus / prev.levelXP);
    const newLevel = (prev.level || 0) + currentLevelCheck;
    const newLevelXP = currentLevelCheck > 0 ? prev.levelXP + 25 : prev.levelXP;

    const guser = lessonId > -1 /*default lesson id is -1*/ ? {
      ...prev,
      level: newLevel,
      xp: newXP,
      levelXP: newLevelXP,
      lastLessonId: lessonId
    } : {
        ...prev,
        level: newLevel,
        xp: newXP,
        levelXP: newLevelXP
      };
    return {gameUser: guser, error: null, loading: false, isDirty: true};
  }),

  updateLastLessonId: (lastLessonId) => set(({gameUser}) => {
    const user = {gameUser: {...gameUser, lastLessonId}, error: null, loading: false, isDirty: true};
    return user;
  }),

  updatePracticedLesson: (practicedLessonsId, nextLessonId) => set(({gameUser}) => {
    let {practicedLessons} = gameUser;
    if (!practicedLessons) {
      gameUser.practicedLessons = {};
      practicedLessons = gameUser.practicedLessons;
    }
    const key = practicedLessonsId.toString();
    if (practicedLessons.hasOwnProperty(key)) {
      const times = Number.parseInt(practicedLessons[key].toString());
      practicedLessons[key] = isNaN(times) ? 1 : times + 1;
    } else {
      practicedLessons[key] = 1;
    }
    const user = {gameUser: {...gameUser, lastLessonId: nextLessonId}, error: null, loading: false, isDirty: true};
    return user;
  }),

  getPracticedTimes: (lessonId) => {
    try {
      const {practicedLessons} = get().gameUser;
      const times = practicedLessons[lessonId.toString()];
      return times || 0;
    } catch {
      return 0;
    }
  },

  saveGameUser: async () => {
    const {uid, level, xp, levelXP, lastLessonId, practicedLessons} = get().gameUser;
    const isDirty = get().isDirty;
    if (uid && isDirty) {
      practicedLessons = practicedLessons || {};
      try {
        await addGameUser({
          uid, level, xp, levelXP, lastLessonId, practicedLessons
        });
        set(({gameUser}) => ({gameUser, error: null, loading: false, isDirty: false}));
      } catch {
        // try one more time
        await addGameUser({
          uid, level, xp, levelXP, lastLessonId, practicedLessons
        });
        set(({gameUser}) => ({gameUser, error: null, loading: false, isDirty: false}));
      }
    }
  }
}));


export default useGameUserStore;
