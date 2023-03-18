import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
import { Translator } from "../Translation/Translator";

function initialiseQuestion(players) {
  return {
    asker: players[0],
  };
}

const initialQuestion = {};

const PlayersAdditionalQuestions = () => {
  const { players, setStatus } = useGameContext();
  const [question, setQuestion] = useState(initialiseQuestion(players));
  const { language } = useAppContext();

  const newQuestion = (playerId) => {
    let asker = players.find((p) => p.id === playerId);
    setQuestion((prevState) => {
      return { ...prevState, asker: asker };
    });
  };
  return (
    <View className="flex-1 p-10 items-center justify-center">
      <View className="flex-1 items-center">
        <Text className="text-white text-2xl text-center">
          <Text className="text-[#aba969]">{question.asker.name} </Text>
          {Translator[language].ChooseAPlayerToAsk}
        </Text>
        <ScrollView className="mt-5 space-y-5 max-h-80">
          {players
            .filter((p) => p.id !== question.asker.id)
            .map((p) => {
              return (
                <TouchableOpacity
                  className="bg-red-800 px-10 py-3 "
                  key={p.id}
                  onPress={() => newQuestion(p.id)}
                >
                  <Text className="text-white text-2xl font-bold text-center">
                    {p.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          // playBtnClickSound();
          setStatus((prev) => gameStatusEnum.Voting);
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
      >
        <Text className="text-white text-3xl">{Translator[language].Vote}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersAdditionalQuestions;
