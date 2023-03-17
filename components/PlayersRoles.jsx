import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../common/GamePlayContext";
import useCurrentPlayer from "../common/hooks/useCurrentPlayer";

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
        اعطو الجوال ل<Text>{currentPlayer.name}</Text>
      </Text>
      {!isRoleShown ? (
        <Text className="text-white text-center text-lg mt-3">
          اضغط التالي حتى تعرف هل انت برا السالفة او داخلها ولا تخلي أحد غيرك
          يشوف الشاشة
        </Text>
      ) : currentPlayer.id === imposter.id ? (
        <Text className="text-white text-center text-lg mt-3">
          انت اللي برا السالفة! حاول تعرف وش السالفة بالضبط من كلام البقية أو
          اقنعهم يصوتون على الشخص الخطأ
        </Text>
      ) : (
        <Text className="text-white text-center text-lg mt-3">
          انت داخل في السالفة واللي هي
          <Text className="text-[#aba969] text-center">
            {" "}
            {gameAnswer.name}{" "}
          </Text>
          هدفك في اللعبة معرفة مين منكم اللي برا السالفة
        </Text>
      )}

      <TouchableOpacity
        onPress={(e) => {
          isRoleShown ? updateCurrentPlayer() : revealRole();
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
      >
        <Text className="text-white text-3xl">التالي</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersRoles;
