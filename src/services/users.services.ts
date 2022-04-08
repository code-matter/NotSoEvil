import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";

const login = async (email: string, password: string) => {
  try {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  return await firebaseAuth.signOut();
};

export const UsersService = {
  login,
  logout,
};
