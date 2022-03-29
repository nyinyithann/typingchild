import {openDB} from 'idb';

const DBName = "TypingChildDatabase";
const LessonStoreName = "lessons";
const GameUserStoreName = "gameuser";

function openConnection() {
    return openDB(DBName, 1, {
        upgrade(db, oldVersion) {
            if (oldVersion === 0) {
                if (!db.objectStoreNames.contains(LessonStoreName)) {
                    const lessonsStore = db.createObjectStore(LessonStoreName, {keyPath: "id"});
                    lessonsStore.createIndex("id", "id");
                }
                if (!db.objectStoreNames.contains(GameUserStoreName)) {
                    const gameUserStore = db.createObjectStore(GameUserStoreName, {keyPath: "uid"});
                    gameUserStore.createIndex("uid", "uid");
                }
            }
        }
    });
}

export async function putLessonsToIndexedDB(lessons, deleteExisting = false) {
    if (!window.indexedDB) {
        return;
    }
    const db = await openConnection();
    const tx = db.transaction(LessonStoreName, 'readwrite');
    if (deleteExisting) {
        await tx.store.clear();
    }
    await Promise.all([...lessons.map(x => tx.store.put(x)), tx.done]);
}


export async function getAllLessonsFromIndexedDB() {
    if (!window.indexedDB) {
        return [];
    }
    const db = await openConnection();
    return await db.getAllFromIndex(LessonStoreName, "id");
}

export async function getLessonFromIndexedDB(id) {
    if (!window.indexedDB) {
        return;
    }
    const db = await openConnection();
    const tx = db.transaction(LessonStoreName, 'readonly');
    const lesson = await tx.store.get(id);
    return lesson;
}

export async function putGameUserToIndexedDB(data) {
    if (!window.indexedDB) {
        return;
    }
    const db = await openConnection();
    const tx = db.transaction(GameUserStoreName, 'readwrite');
    await tx.store.put(data);
    await tx.done;
}

export async function getGameUserFromIndexedDB(uid) {
    if (!window.indexedDB) {
        return;
    }
    const db = await openConnection();
    const tx = db.transaction(GameUserStoreName, 'readonly');
    const gameUser = await tx.store.get(uid);
    return gameUser;
}

export async function getLessonCountFromIndexedDB() {
    if (!window.indexedDB) {
        return 0;
    }
    const db = await openConnection();
    const count = await db.countFromIndex(LessonStoreName, "id");
    return count;
}
