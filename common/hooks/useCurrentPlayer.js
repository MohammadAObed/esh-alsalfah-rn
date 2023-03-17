import { useEffect, useState } from "react";
import { gameStatusEnum } from "../gamePlayEnums";
import { Player } from "../model";
function useCurrentPlayer(players, setPlayers, setStatus) {
  const [currentPlayer, setCurrentPlayer] = useState(new Player(""));
  const [isRoleShown, setIsRoleShown] = useState(false);

  useEffect(() => {
    const playersHasNotPlayed = players.filter((x) => x.hasPlayed === false);
    if (playersHasNotPlayed.length === 0) {
      setStatus((prev) => gameStatusEnum.Questions);
      return;
    }
    const randomPlayerIdIndex = Math.floor(
      Math.random() * playersHasNotPlayed.length
    );
    setCurrentPlayer((prev) => {
      // console.log();
      return playersHasNotPlayed[randomPlayerIdIndex];
    });
  }, [players]);
  return [currentPlayer, setCurrentPlayer, isRoleShown, setIsRoleShown];
}

export default useCurrentPlayer;
