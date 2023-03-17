import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";

const PlayersRoundEnd = () => {
  const { setStatus } = useGameContext();
  return (
    <View className="flex-1 p-10 items-center justify-between">
      <Text className="text-[#aba969] text-3xl">نهاية الجولة</Text>
      <Text className="text-white text-2xl text-center">
        تقدرون تكملون لعب أو تغيرون لاعب أو ترجعون لشاشة اختيار الأسئلة
      </Text>
      <Text className="text-white text-2xl text-center">
        زمبحكولك! كمّل لعب، حتى لو قالولك صعب
      </Text>
      <View className="items-center">
        <TouchableOpacity
          onPress={(e) => {
            setStatus((prev) => gameStatusEnum.RevealRoles);
            // playBtnClickSound();
          }}
          className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6 w-60"
        >
          <Text className="text-white text-3xl text-center">كمّل لعب</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            setStatus((prev) => gameStatusEnum.CreatePlayers);
            // playBtnClickSound();
          }}
          className="px-10 py-2.5 bg-red-800 rounded-sm mt-3 w-60"
        >
          <Text className="text-white text-3xl text-center">
            تغيير اللاعبين
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayersRoundEnd;
