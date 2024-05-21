import { useContext } from "react";
import { FirestoreSubContext } from "components/FirestoreSubProvider";

// Hook to use the context
export const useFirestoreSub = () => useContext(FirestoreSubContext);
