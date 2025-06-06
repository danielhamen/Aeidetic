import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, Firestore } from "firebase/firestore";
import { UserRecord } from "./Common";

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_APP_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_APP_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_APP_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db: Firestore = getFirestore(app);

// --- Auth API ---
export interface AuthAPI {
  getCurrentUser(): User | null;
  signIn(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  signInWithGoogle(): Promise<User>;
  signOut(): Promise<void>;
}

const provider = new GoogleAuthProvider();

export const Auth: AuthAPI = {
  getCurrentUser() {
    return auth.currentUser;
  },
  async signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  },
  async signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  },
  async register(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  async signOut() {
    await signOut(auth);
  },
};

// --- Firestore API ---
export interface FirestoreAPI {
  getUserProfile(uid: string): Promise<UserRecord | null>;
}

export const FirestoreClient: FirestoreAPI = {
  async getUserProfile(uid: string): Promise<UserRecord | null> {
    const userDoc = doc(db, "users", uid);
    const snap = await getDoc(userDoc);
    if (!snap.exists()) return null;
    return snap.data() as UserRecord;
  },
};

export { auth, db };
