import create from 'zustand';
import {putLessonsToIndexedDB, getLessonCountFromIndexedDB, getAllLessonsFromIndexedDB} from 'services/indexedDb';
import {getConfigs, getLessons} from 'services/firebase/db';
import {constructError, ERROR_TO_DISPLAY} from "util";

export const defaultSelectedLesson = {
  id: -1,
  type: "default",
  category: "",
  title: "",
  content: "",
  bonusPoints: 0
};

export const lessonStoreSelector = ({
  loading,
  error,
  defaultLessons,
  userLessons,
  selectedLesson,
  resetError,
  loadLessons,
  setSelectedLesson,
  setSelectedLessonById,
  getNextLessonId
}) => ({
  loading,
  error,
  defaultLessons,
  userLessons,
  selectedLesson,
  resetError,
  loadLessons,
  setSelectedLesson,
  setSelectedLessonById,
  getNextLessonId
});

const useLessonStore = create((set, get) => ({
  loading: false,
  error: null,
  defaultLessons: [],
  userLessons: [],
  selectedLesson: defaultSelectedLesson,

  resetError: () => set(({loading, defaultLessons, userLessons, selectedLesson}) => ({
    loading,
    defaultLessons,
    userLessons,
    selectedLesson,
    error: null
  })),

  loadLessons: async () => {
    try {
      set(({defaultLessons, userLessons, selectedLesson}) => ({
        loading: true,
        error: null,
        defaultLessons,
        userLessons,
        selectedLesson
      }));
      const configs = await getConfigs();
      const {downloadAll, totalLessonCount} = configs;
      const localLessonCount = await getLessonCountFromIndexedDB();
      if (downloadAll || totalLessonCount > localLessonCount) {
        const lessonsFromFireStore = await getLessons();
        await putLessonsToIndexedDB(lessonsFromFireStore, true);
        set(({userLessons, selectedLesson}) => ({
          loading: false,
          error: null,
          defaultLessons: lessonsFromFireStore,
          userLessons,
          selectedLesson
        }));
      } else {
        let lessons = await getAllLessonsFromIndexedDB();
        if (!lessons || lessons.length === 0) {
          lessons = await getLessons();
        }
        set(({userLessons, selectedLesson}) => ({
          loading: false,
          error: null,
          defaultLessons: lessons,
          userLessons,
          selectedLesson
        }));
      }
    } catch (e) {
      const errMsg = "An error occured while loading lessons from the server. Please reload the page after closing the dialog.";
      const error = constructError(ERROR_TO_DISPLAY, errMsg, e.message);
      set(({defaultLessons, userLessons, selectedLesson}) => ({
        loading: false,
        error,
        defaultLessons,
        userLessons,
        selectedLesson
      }));
    }
  },

  setSelectedLesson: (selectedLesson) => {
    set(({defaultLessons, userLessons}) => ({
      loading: false,
      error: null,
      defaultLessons,
      userLessons,
      selectedLesson: selectedLesson ? selectedLesson : defaultSelectedLesson
    }));
  },

  setSelectedLessonById: (id, defaultId) => {
    let lesson = get().defaultLessons.find(x => x.id === id);
    if (!lesson) {
      lesson = get().userLessons.find(x => x.id === id);
    }
    if (lesson) {
      get().setSelectedLesson(lesson);
    } else {
      if (defaultId != null && defaultId != undefined) {
        lesson = get().defaultLessons.find(x => x.id === defaultId);
      }
      get().setSelectedLesson(lesson || defaultSelectedLesson);
    }
  },

  getNextLessonId: (previousLessonId) => {
    let nextLesson = get().defaultLessons.find(x => x.id === (previousLessonId + 1));
    if (!nextLesson) {
      const userLessons = get().userLessons;
      const index = userLessons.findIndex(x => x.id === previousLessonId);
      nextLesson = userLessons.at(index + 1);
    }
    return nextLesson ? nextLesson.id : 0;
  }

}));

export default useLessonStore;
