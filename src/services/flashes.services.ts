import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../utils/firebase";

const list = async () => {
  return await getDocs(collection(firebaseDB, "shop-flash"));
};

export const FlashesService = {
  list,
  // get,
  // update,
  // create,
  // del
};
