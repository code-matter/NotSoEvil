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

const list = async () => {
  return await getDocs(collection(firebaseDB, "orders"));
};

const get = async (id: string) => {
  try {
    const d = await getDocs(
      query(
        collection(firebaseDB, "orders"),
        where("orderDetails.details.id", "==", id)
      )
    );
    let order = {};
    d.forEach((d) => {
      if (d.data()) order = d.data();
    });
    return order;
  } catch (error) {
    console.error(error);
  }
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

const create = async (details: any) => {
  try {
    return await setDoc(doc(firebaseDB, "orders", details.details.id), {
      orderDetails: details,
    });
  } catch (error) {
    console.error(error);
  }
};

export const OrdersService = {
  list,
  get,
  update,
  create,
  // del
};
