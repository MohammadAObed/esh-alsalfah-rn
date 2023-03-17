import React, { useEffect, useState } from "react";
import { getRandomItemFromArray } from "../utils";
function useNewGameStarters(GamesJSONDetails, singleGame, players, status) {
  const [singleGameDetails, setSingleGameDetails] = useState({});
  const [imposter, setImpost] = useState({});
  const [makeNewGameStarters, setMakeNewGameStarters] = useState(false);
  useEffect(() => {
    if (makeNewGameStarters == false) return;
    const chosenDetails = GamesJSONDetails.filter(
      (x) => x.gameId == singleGame.id
    );
    setSingleGameDetails((prev) => {
      return getRandomItemFromArray(chosenDetails);
    });
    setImpost((prev) => {
      return getRandomItemFromArray(players);
    });
    setMakeNewGameStarters(false);
  }, [makeNewGameStarters]);
  return [singleGameDetails, imposter, setMakeNewGameStarters];
}

export default useNewGameStarters;
