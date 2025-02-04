import * as Localization from "expo-localization";
import React, { createContext, useContext, useEffect } from "react";
import { Translator } from "../Translation/Translator";
import { soundsEnum } from "./gamePlayEnums";
import useAudio from "./hooks/useAudio";
import useLocalStorage from "./hooks/useLocalStorage";
const AppContext = createContext();
function AppContextProvider({ children }) {
  let locale = "EN";
  try {
    locale = Localization?.getLocales()[0]?.languageCode?.toUpperCase()?.split("-")?.[0] ?? "EN";
  } catch (error) {}
  if (!Object.keys(Translator).includes(locale)) {
    locale = "EN";
  }
  const [language, setLanguage] = useLocalStorage("WTT_Language", locale);
  const { playSound } = useAudio(soundsEnum.Btn);
  return <AppContext.Provider value={{ language, setLanguage, playSound }}>{children}</AppContext.Provider>;
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
