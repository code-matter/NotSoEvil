import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";

const login = async (email: string, password: string) => {
  try {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error(error);
  }

  // return user;
};

const logout = async () => {
  firebaseAuth.signOut();
};

export const UsersService = {
  login,
  logout,
};
