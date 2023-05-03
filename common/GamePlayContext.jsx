import React, {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRoute } from "@react-navigation/native";
import useLocalStorage from "./hooks/useLocalStorage";
import useNewGameStarters from "./hooks/useNewGamePlayStarters";
import { gameStatusEnum } from "./gamePlayEnums";
import GamesListJSON from "./data/gamesList.json";
import GamesListDetailsJSON from "./data/gamesListDetails.json";
import useModal from "./hooks/useModal";
import Navbar from "../components/Navbar";
//!!!!! REAAAAD MEEEE, add the components to Stack.Screen, replace {children} with your (Game component), then use navigation.navigate inside the game componenet to animate, nvaigate, whatever to the right componenet based on the enum etc....
const GameContext = createContext();
//Drawbacks of context: whenever state of this context changes, everything inside the provider (children) rerenders!!!!, i tried useMemo, React.memo, ... nothing worked
//so only put state that is rarerly changing && its needed in almost all pages of the app
function GameContextProvider({ children }) {
  const {
    params: { id },
  } = useRoute();
  const { modalVisible, showModal, hideModal } = useModal();
  const [status, setStatus] = useState(gameStatusEnum.CreatePlayers);
  const [players, setPlayers] = useLocalStorage("ESH_ALS_Players", []);
  // const [players, setPlayers] = useState([]);
  const [currentGame] = useState(() => {
    return GamesListJSON.find((g) => g.id == id) || null;
  });
  const [currentGameDetails, setCurrentGameDetails] = useLocalStorage(
    "ESH_ALS_GameDetails",
    GamesListDetailsJSON
  );
  const [gameAnswer, imposter, setMakeNewGameStarters] = useNewGameStarters(
    currentGameDetails,
    currentGame,
    players,
    status
  );
  useEffect(() => {
    // console.count();
    // console.log(gameAnswer);
  });
  if (!currentGame) {
    return (
      <Text className="mx-16 mt-10">
        اللعبة غير موجودة، الرجوع الى الصفحة الرئيسية
      </Text>
    );
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
