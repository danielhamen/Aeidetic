"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, Auth as AuthAPI, FirestoreClient } from "api/lib/lib/ClientAPI";
import {
  getUserRecord,
  updateUserRecord,
  UserRecord,
} from "api/lib/lib/Common";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => AuthAPI.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserRecord | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        const prof = await FirestoreClient.getUserProfile(u.uid);
        setProfile(prof);
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    profile,
    loading,
    signIn: AuthAPI.signIn,
    register: AuthAPI.register,
    signInWithGoogle: AuthAPI.signInWithGoogle,
    signOut: AuthAPI.signOut,
    getUserRecord,
    updateUserRecord,
  };
}
