import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth as getClientAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  initializeApp as initializeAdminApp,
  applicationDefault,
} from "firebase-admin/app";
import {
  getAuth as getAdminAuth,
  UserRecord,
  ListUsersResult,
} from "firebase-admin/auth";

// Client App (if you need it)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_APP_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_APP_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_APP_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID!,
};

const clientApp = initializeClientApp(firebaseConfig);
export const auth = getClientAuth(clientApp);
export const db = getFirestore(clientApp);

// Admin App
const adminApp = initializeAdminApp({
  credential: applicationDefault(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECT_ID!,
});
const adminAuth = getAdminAuth(adminApp);

export interface FirebaseAdminAuthAPI {
  createUser(email: string, password: string): Promise<string>;
  deleteUser(uid: string): Promise<void>;
  getUserByUID(uid: string): Promise<UserRecord>;
  getUserByEmail(email: string): Promise<UserRecord>;
  setCustomUserClaims(uid: string, claims: object): Promise<void>;
  listUsers(limit?: number, pageToken?: string): Promise<ListUsersResult>;
}

interface FirebaseAdminAPI {
  auth: FirebaseAdminAuthAPI;
}

export const FirebaseAdminAPI: FirebaseAdminAPI = {
  auth: {
    async createUser(email, password) {
      const user = await adminAuth.createUser({ email, password });
      return user.uid;
    },
    async deleteUser(uid) {
      await adminAuth.deleteUser(uid);
    },
    async getUserByUID(uid) {
      return await adminAuth.getUser(uid);
    },
    async getUserByEmail(email) {
      return await adminAuth.getUserByEmail(email);
    },
    async setCustomUserClaims(uid, claims) {
      await adminAuth.setCustomUserClaims(uid, claims);
    },
    async listUsers(limit = 1000, pageToken) {
      return await adminAuth.listUsers(limit, pageToken);
    },
  },
};
