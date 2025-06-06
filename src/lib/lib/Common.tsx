import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "api/lib/lib/ClientAPI";

export const defaultUserRecord = (uid: string): UserRecord => ({
  uid,
  emailVerified: false,
  disabled: false,
  serviceData: {},
});

export async function getUserRecord(uid: string): Promise<UserRecord> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const blank = defaultUserRecord(uid);
    await setDoc(ref, blank);
    return blank;
  }

  return { ...defaultUserRecord(uid), ...snap.data() } as UserRecord;
}

export async function updateUserRecord(uid: string, data: Partial<UserRecord>) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { ...defaultUserRecord(uid), ...data });
  } else {
    await updateDoc(ref, data);
  }
}

/**
 * Firebase User Id
 */
export type UID = string;
export function isUID(obj: unknown): obj is UID {
  return typeof obj === "string";
}

export interface ExpoProject {
  projectId: string;
  projectName: string;
  createdOn?: Date;
}

export interface ExpoData {
  projects: ExpoProject[];
  maxProjects: number;
}

/**
 * Firebase User Record
 */
export interface UserRecord {
  uid: UID;
  email?: string;
  displayName?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  disabled: boolean;
  photoURL?: string;
  serviceData: {
    expoData?: ExpoData;
  };
}

export function isUserRecord(obj: unknown): obj is UserRecord {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "uid" in obj &&
    isUID(obj.uid) &&
    "displayName" in obj &&
    typeof obj.displayName === "string" &&
    "disabled" in obj &&
    typeof obj.disabled === "boolean" &&
    "phoneNumber" in obj &&
    typeof obj.phoneNumber === "string" &&
    "photoURL" in obj &&
    typeof obj.photoURL === "string" &&
    "email" in obj &&
    typeof obj.email === "string"
  );
}
