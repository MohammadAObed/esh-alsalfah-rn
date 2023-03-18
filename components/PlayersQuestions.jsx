import React, { useState, useEffect, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
import { Translator } from "../Translation/Translator";

const initialQuestion = {
  asker: {},
  askee: {},
  prevAskersIds: [],
  prevAskeeIds: [],
  began: false,
};

const noAskerIndex = -1;

const PlayersQuestions = () => {
  const { players, setStatus } = useGameContext();
  const [question, setQuestion] = useState(initialQuestion);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [askerIndex, setAskerIndex] = useState(noAskerIndex);
  const { language } = useAppContext();
  let randomPositionedPlayers = useMemo(
    () => players.sort(() => Math.random() - 0.5),
    [players]
  );
  const NewQuestion = () => {
    setIsNewQuestion(true);
    setQuestion((prev) => {
      return { ...prev, began: true };
    });
  };
  useEffect(() => {
    if (!isNewQuestion) return;
    var checker = players.every((p) => question.prevAskersIds.includes(p.id)); //check if the questions ended, all players asked and got asked
    if (checker) {
      setStatus(gameStatusEnum.AdditionalQuestions);
      return;
    }
    if (askerIndex >= randomPositionedPlayers.length) {
      setAskerIndex(0);
      return;
    }
    setAskerIndex((prevState) => prevState + 1);
    setIsNewQuestion(false);
  }, [isNewQuestion]);

  useEffect(() => {
    //? what to do? (ask chatgpt) just randomise the order of players in te players array
    //? then let first one ask second, third ask fourth or first if they are only three...
    //? then second ask third, (3 players)
    //? then fourth ask first, second ask third (4players)
    //? hint (shuffle array is the name) from chatgpt, code: array.sort(() => Math.random() - 0.5);
    if (askerIndex <= noAskerIndex) return;
    let askeeIndex = askerIndex + 1;
    if (askerIndex >= randomPositionedPlayers.length - 1) {
      askeeIndex = 0;
    }
    let asker = randomPositionedPlayers[askerIndex];
    let askee = randomPositionedPlayers[askeeIndex];
    setQuestion((prevState) => {
      return {
        ...prevState,
        asker: asker,
        askee: askee,
        prevAskersIds: [...prevState.prevAskersIds, asker.id],
        prevAskeeIds: [...prevState.prevAskeeIds, askee.id],
      };
    });
  }, [askerIndex]);
  useEffect(() => {});
  return (
    <View className="flex-1 p-10 items-center justify-center">
      <Text className="text-[#aba969] text-4xl text-center -mt-20">
        {Translator[language].QuestionsTime}
      </Text>
      <Text className="text-center text-lg text-white">
        {question.began == false ? (
          <Text>{Translator[language].EveryPlayerWillAskAnother}</Text>
        ) : (
          <Text>
            <Text className="text-[#aba969]">{question.asker.name} </Text>{" "}
            {Translator[language].Ask}
            <Text className="text-[#aba969]"> {question.askee.name} </Text>
            {Translator[language].QuestionAboutTheTopic}
          </Text>
        )}
      </Text>
      <TouchableOpacity
        onPress={(e) => {
          NewQuestion();
          // playBtnClickSound();
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
      >
        <Text className="text-white text-3xl">{Translator[language].Next}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersQuestions;
