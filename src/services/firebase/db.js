import {getFirestore, doc, getDoc, getDocs, setDoc, query, collection, connectFirestoreEmulator} from "firebase/firestore";
import app from 'services/firebase/firebase';

const map = new WeakMap();
async function getFirestoreDb() {
    let db = map.get(app);
    if (!db) {
        db = getFirestore(app);
        if (process.env.NODE_ENV === "development") {
            connectFirestoreEmulator(db, "192.168.1.3", 8080);
        }
        map.set(app, db);
    }
    return db;
}

export async function getGameUser(userUID) {
    const db = await getFirestoreDb();
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function addGameUser(data) {
    const db = await getFirestoreDb();
    await setDoc(doc(db, "users", data.uid), data);
}

export async function getLessons() {
    const db = await getFirestoreDb();
    const q = query(collection(db, "lessons"));
    const snapShot = await getDocs(q);
    return snapShot.docs.map(doc => doc.data());
}

export async function getConfigs() {
    const db = await getFirestoreDb();
    const docRef = doc(db, "configs", "configs_id");
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
