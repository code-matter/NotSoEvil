import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../utils/firebase";

const list = async (storeName: string, filters?: any) => {
  if (filters) {
    const dbRef = collection(firebaseDB, storeName);
    const q = query(
      dbRef,
      where(filters.fieldPath, filters.operation, filters.value)
    );
    return await getDocs(q);
  } else {
    return await getDocs(collection(firebaseDB, storeName));
  }
};

export const FlashesService = {
  list,
  // get,
  // update,
  // create,
  // del
};
