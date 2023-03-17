import { Player } from "../model";

function resetPoints(players) {
  return players.map((player) => ({ ...player, points: 0 }));
}

function usePlayerStuff(players, setPlayers) {
  const isPlayersEmpty = players?.length > 0 ? false : true;
  const addPlayer = (playerName) => {
    const newPlayer = new Player(playerName);
    newPlayer.id = isPlayersEmpty
      ? 1
      : Math.max(...players.map((p) => p.id)) + 1;
    // console.log(newPlayer);
    setPlayers((prev) => {
      let updatedPlayers = resetPoints(prev);
      return [...updatedPlayers, newPlayer];
    });
  };
  const removePlayer = (playerId) => {
    const newPlayers = players.filter((p) => p.id != playerId);
    let updatedPlayers = resetPoints(newPlayers);
    setPlayers((prev) => {
      return [...updatedPlayers];
    });
  };

  return { isPlayersEmpty, removePlayer, addPlayer };
}

export default usePlayerStuff;
