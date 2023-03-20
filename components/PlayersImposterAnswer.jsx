import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import GamesJSONDetails from "../common/data/gamesListDetails.json";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
import { getRandomAnswers } from "../common/utils";
import { Translator } from "../Translation/Translator";

const numberOfRandomAnswer = 7;

const PlayersImposterAnswer = () => {
  const { imposter, singleGame, gameAnswer, setStatus, setPlayers, players } =
    useGameContext();
  const [imposterAnswer, setImposterAnswer] = useState({ id: 0 });
  const [randomAnswers, setRandomAnswers] = useState(
    getRandomAnswers(
      GamesJSONDetails.filter((x) => x.gameId == singleGame.id),
      numberOfRandomAnswer,
      gameAnswer
    )
  );
  const { language, playSound } = useAppContext();

  const checkAnswer = (imposterAnswerParam) => {
    const isCorrectAnswer =
      imposterAnswerParam.id == gameAnswer.id ? true : false;
    setImposterAnswer(imposterAnswerParam);
    let updatedPlayers = players.map((player) => {
      if (player.id == imposter.id && isCorrectAnswer) {
        return { ...player, points: player.points + 100 };
      }
      return player;
    });
    setPlayers((prevState) => {
      return updatedPlayers;
    });
    const timeoutId = setTimeout(() => {
      setStatus(gameStatusEnum.ShowPoints);
    }, 3000);

    return () => clearTimeout(timeoutId);
    //sss
  };
  return (
    <View className="flex-1 p-10 items-center">
      <Text className="text-white text-3xl">
        <Text className="text-[#aba969]">{imposter.name}</Text>
        {Translator[language].WhatsTheTopic}
      </Text>
      <ScrollView className="space-y-2 mt-3 max-h-full">
        {randomAnswers.map((ra) => {
          return (
            <TouchableOpacity
              className={`px-10 py-2.5 bg-red-800 rounded-sm ${
                ra.id == gameAnswer.id && imposterAnswer.id != 0
                  ? `bg-green-700`
                  : ra.id == imposterAnswer.id
                  ? `bg-red-900`
                  : `bg-red-800`
              }`}
              // className="px-10 py-2.5 bg-red-800 rounded-sm"
              key={ra.id}
              onPress={() => {
                playSound();
                checkAnswer(ra);
              }}
              disabled={imposterAnswer.id == 0 ? false : true}
            >
              <Text className="text-white text-3xl text-center">{ra.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PlayersImposterAnswer;
