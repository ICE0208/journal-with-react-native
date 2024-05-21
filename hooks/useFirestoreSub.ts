import { useContext } from "react";
import { FirestoreSubContext } from "components/FirestoreSubProvider";

export const useFirestoreSub = () => useContext(FirestoreSubContext);
