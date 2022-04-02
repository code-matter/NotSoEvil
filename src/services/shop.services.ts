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

const list = async (storeName: string) => {
  return await getDocs(collection(firebaseDB, storeName));
};

const update = async (
  storeName: string,
  documentName: string,
  updatedObj: any
) => {
  const docRef = doc(firebaseDB, storeName, documentName);
  const currentDoc = await getDoc(docRef);
  if (currentDoc.exists()) {
    setDoc(docRef, { ...currentDoc.data(), ...updatedObj });
  }
  return;
};

export const ShopService = {
  list,
  // get,
  update,
  // create,
  // del
};
