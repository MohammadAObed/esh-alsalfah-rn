import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
import { Translator } from "../Translation/Translator";

const PlayersRoundEnd = () => {
  const { setStatus } = useGameContext();
  const { language } = useAppContext();

  return (
    <View className="flex-1 p-10 items-center justify-between">
      <Text className="text-[#aba969] text-3xl">
        {" "}
        {Translator[language].RoundEnd}
      </Text>
      <Text className="text-white text-2xl text-center">
        {Translator[language].YouCanContinue}
      </Text>
      <Text className="text-white text-2xl text-center">
        {Translator[language].EndMsg}
      </Text>
      <View className="items-center">
        <TouchableOpacity
          onPress={(e) => {
            setStatus((prev) => gameStatusEnum.RevealRoles);
            // playBtnClickSound();
          }}
          className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6 w-60"
        >
          <Text className="text-white text-3xl text-center">
            {" "}
            {Translator["EN"].ContinueTheGame}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            setStatus((prev) => gameStatusEnum.CreatePlayers);
            // playBtnClickSound();
          }}
          className="px-10 py-2.5 bg-red-800 rounded-sm mt-3 w-60"
        >
          <Text className="text-white text-3xl text-center">
            {Translator[language].ChangePlayers}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayersRoundEnd;
