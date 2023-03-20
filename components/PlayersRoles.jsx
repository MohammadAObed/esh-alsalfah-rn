import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import useCurrentPlayer from "../common/hooks/useCurrentPlayer";
import { Translator } from "../Translation/Translator";

const PlayersRoles = () => {
  const {
    players: pp,
    gameAnswer,
    imposter,
    setStatus,
    setMakeNewGameStarters,
  } = useGameContext();
  const [players, setPlayers] = useState(pp);
  const [currentPlayer, setCurrentPlayer, isRoleShown, setIsRoleShown] =
    useCurrentPlayer(players, setPlayers, setStatus);
  const { language, playSound } = useAppContext();
  const updateCurrentPlayer = () => {
    const playersNotPlayed = players.map((player) => {
      if (player.id === currentPlayer.id) {
        return { ...player, hasPlayed: true };
      }
      return { ...player };
    });
    setPlayers((prev) => {
      return playersNotPlayed;
    });
    setIsRoleShown(false);
  };
  const revealRole = () => {
    setIsRoleShown(true);
  };
  useEffect(() => {
    setMakeNewGameStarters((prev) => true);
    // console.log(gameAnswer, imposter);
  }, []);
  return (
    <View className="flex-1 p-10 items-center justify-center">
      <Text className="text-[#aba969] text-4xl text-center -mt-20">
        {currentPlayer.name}
      </Text>
      <Text className="text-white text-2xl text-center mt-3">
        {Translator[language].GiveThePhoneTo}
        <Text>{currentPlayer.name}</Text>
      </Text>
      {!isRoleShown ? (
        <Text className="text-white text-center text-lg mt-3">
          {Translator[language].PressNextToKonwIfYou}
        </Text>
      ) : currentPlayer.id === imposter.id ? (
        <Text className="text-white text-center text-lg mt-3">
          {Translator[language].YouAreTheImposter}
        </Text>
      ) : (
        <Text className="text-white text-center text-lg mt-3">
          {Translator[language].YouAreNormal}
          <Text className="text-[#aba969] text-center"> {gameAnswer.name}</Text>
          {Translator[language].YourNormalGoalIs}
        </Text>
      )}

      <TouchableOpacity
        onPress={(e) => {
          playSound();
          isRoleShown ? updateCurrentPlayer() : revealRole();
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
      >
        <Text className="text-white text-3xl">{Translator[language].Next}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersRoles;
