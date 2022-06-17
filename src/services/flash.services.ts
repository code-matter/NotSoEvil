import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import _ from "lodash";
import { firebaseDB } from "../utils/firebase";

const STORE_NAME = "flash-items";

const list = async () => {
  return await getDocs(collection(firebaseDB, STORE_NAME));
};

const update = async (documentID: string, updatedObj: any) => {
  const docRef = doc(firebaseDB, STORE_NAME, documentID);
  const currentDoc = await getDoc(docRef);
  if (currentDoc.exists()) {
    setDoc(docRef, { ...currentDoc.data(), ...updatedObj });
  }
  return;
};

export const FlashService = {
  list,
  // get,
  update,
  // create,
  // del
};
