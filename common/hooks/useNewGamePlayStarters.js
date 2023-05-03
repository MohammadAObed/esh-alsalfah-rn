import React, { useEffect, useState } from "react";
import { getRandomItemFromArray } from "../utils";
function useNewGameStarters(GameDetails, currentGame, players, status) {
  const [currentGameDetails, setCurrentGameDetails] = useState({});
  const [imposter, setImpost] = useState({});
  const [makeNewGameStarters, setMakeNewGameStarters] = useState(false);
  useEffect(() => {
    if (makeNewGameStarters == false) return;
    const chosenDetails = GameDetails.filter(
      (x) => x.gameId == currentGame.id && x.isUsed
    );
    setCurrentGameDetails((prev) => {
      return getRandomItemFromArray(chosenDetails);
    });
    setImpost((prev) => {
      return getRandomItemFromArray(players);
    });
    setMakeNewGameStarters(false);
  }, [makeNewGameStarters]);
  return [currentGameDetails, imposter, setMakeNewGameStarters];
}

export default useNewGameStarters;
