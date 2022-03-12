import { collection, getDocs, query, where } from "firebase/firestore";
import _ from "lodash";
import { firebaseDB } from "../utils/firebase";

const list = async (storeName: string) => {
    return await getDocs(collection(firebaseDB, storeName));
};

export const FlashesService = {
  list,
  // get,
  // update,
  // create,
  // del
};
