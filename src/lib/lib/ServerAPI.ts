// /lib/lib/ServerAPI.ts
import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth, UserRecord as AdminUserRecord } from "firebase-admin/auth";
import { UserRecord } from "./Common";

if (getApps().length === 0) {
  initializeApp({
    credential: applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_APP_PROJECT_ID!,
  });
}

const adminAuth = getAuth();

export interface AuthAPI {
  createUser(email: string, password: string): Promise<string>;
  deleteUser(uid: string): Promise<void>;
  getUser(uid: string): Promise<UserRecord>;
}

export interface StorageAPI {
  0: null;
}

export interface FirestoreAPI {
  0: null;
}

export const Auth: AuthAPI = {
  async createUser(email, password) {
    const user = await adminAuth.createUser({ email, password });
    return user.uid;
  },
  async deleteUser(uid) {
    await adminAuth.deleteUser(uid);
  },
  async getUser(uid) {
    const user: AdminUserRecord = await adminAuth.getUser(uid);
    return {
      uid: user.uid,
      email: user.email || undefined,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      disabled: user.disabled,
      photoURL: user.photoURL,
    };
  },
};

export const Storage: StorageAPI = {
  0: null,
};

export const Firestore: FirestoreAPI = {
  0: null,
};
