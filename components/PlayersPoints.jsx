import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
const PlayersPoints = () => {
  const { players, setStatus } = useGameContext();
  return (
    <View className="flex-1 p-10 items-center justify-between">
      <Text className="text-white text-6xl">النتائج</Text>
      <View className="w-full">
        {players.map((player) => {
          return <PlayerPoint key={player.id} {...player} />;
        })}
      </View>
      <TouchableOpacity
        onPress={(e) => {
          setStatus((prev) => gameStatusEnum.RoundEnd);
          // playBtnClickSound();
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
      >
        <Text className="text-white text-3xl">التالي</Text>
      </TouchableOpacity>
    </View>
  );
};

const PlayerPoint = ({ name, points }) => {
  return (
    <View className="flex-row justify-between items-center w-full space-y-3">
      <Text className="text-white text-3xl">{points}</Text>
      <Text className="text-white text-3xl">{name}</Text>
    </View>
  );
};

export default PlayersPoints;
