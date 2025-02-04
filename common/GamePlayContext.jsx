import { useRoute } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useState } from "react";
import GamesListJSON from "./data/gamesList.json";
import GamesListDetailsJSON from "./data/gamesListDetails.json";
import { gameStatusEnum } from "./gamePlayEnums";
import useLocalStorage from "./hooks/useLocalStorage";
import useModal from "./hooks/useModal";
import useNewGameStarters from "./hooks/useNewGamePlayStarters";
//!!!!! REAAAAD MEEEE, add the components to Stack.Screen, replace {children} with your (Game component), then use navigation.navigate inside the game componenet to animate, nvaigate, whatever to the right componenet based on the enum etc....
const GameContext = createContext();
//Drawbacks of context: whenever state of this context changes, everything inside the provider (children) rerenders!!!!, i tried useMemo, React.memo, ... nothing worked
//so only put state that is rarerly changing && its needed in almost all pages of the app
function GameContextProvider({ children }) {
  // AsyncStorage.clear();
  const {
    params: { id },
  } = useRoute();
  const { modalVisible, showModal, hideModal } = useModal();
  const [status, setStatus] = useState(gameStatusEnum.CreatePlayers);
  const [players, setPlayers] = useLocalStorage("WTT_Players", []);
  // const [players, setPlayers] = useState([]);
  const [currentGame] = useState(() => {
    return GamesListJSON.find((g) => g.id == id) || null;
  });
  // const isGameDetailsOldVersion = (oldData) => {
  //   if (!Array.isArray(oldData)) return false;
  //   const versionObj = oldData.find((x) => x.isVersion);
  //   return !versionObj || versionObj?.version < 1.1;
  // };
  const [currentGameDetails, setCurrentGameDetails] = useLocalStorage("WTT_GameDetails", GamesListDetailsJSON /* , isGameDetailsOldVersion */);
  const [gameAnswer, imposter, setMakeNewGameStarters] = useNewGameStarters(currentGameDetails, currentGame, players, status);
  useEffect(() => {
    // console.count();
    // console.log(gameAnswer);
  });
  if (!currentGame) {
    return <Text className="mx-16 mt-10">اللعبة غير موجودة، الرجوع الى الصفحة الرئيسية</Text>;
  }
  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        currentGame,
        showModal,
        hideModal,
        modalVisible,
        status,
        setStatus,
        gameAnswer,
        imposter,
        setMakeNewGameStarters,
        currentGameDetails,
        setCurrentGameDetails,
      }}
    >
      {children}
      {/* <GamePlay /> */}
    </GameContext.Provider>
  );
}

function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}

function useGameContextWithEffect(callback, dependencies) {
  const context = useGameContext();
  useEffect(() => {
    callback(context);
  }, dependencies);
}

export { GameContextProvider, useGameContext };
