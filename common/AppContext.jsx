import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Translator } from "../Translation/Translator";
import { soundsEnum } from "./gamePlayEnums";
import useAudio from "./hooks/useAudio";
import useLocalStorage from "./hooks/useLocalStorage";
const AppContext = createContext();
function AppContextProvider({ children }) {
  const [language, setLanguage] = useLocalStorage("ESH_ALS_Language", "AR");
  const { playSound } = useAudio(soundsEnum.Btn);
  return (
    <AppContext.Provider value={{ language, setLanguage, playSound }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

function useAppContextWithEffect(callback, dependencies) {
  const context = useAppContext();
  useEffect(() => {
    callback(context);
  }, dependencies);
}

export { AppContextProvider, useAppContext };
