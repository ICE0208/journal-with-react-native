import { Unsubscribe } from "firebase/auth";
import { createContext, useContext, useRef, useState } from "react";

export const FirestoreSubContext = createContext<{
  unSubscribe: () => void;
  setUnSubscribe: (unsubscribe: Unsubscribe) => void;
}>({
  unSubscribe: () => {},
  setUnSubscribe: () => {},
});

// Create a provider component
const FirestoreSubProvider = ({ children }: { children: React.ReactNode }) => {
  const unSubscribeRef = useRef<Unsubscribe | null>(null);

  const unSubscribe = () => {
    if (unSubscribeRef.current) unSubscribeRef.current();
  };

  const setUnSubscribe = (unsubscribe: Unsubscribe) => {
    unSubscribeRef.current = unsubscribe;
  };

  return (
    <FirestoreSubContext.Provider value={{ unSubscribe, setUnSubscribe }}>
      {children}
    </FirestoreSubContext.Provider>
  );
};

export default FirestoreSubProvider;
