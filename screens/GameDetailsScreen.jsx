import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import Game from "../components/GamesList_Game";
import GamesListDetailsJSON from "../common/data/gamesListDetails.json";
import { Translator } from "../Translation/Translator";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import { ArrowDownLeftIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { gameStatusEnum } from "../common/gamePlayEnums";

const fontSizeRange = {
  min: 17,
  max: 29,
  randomSizes: [],
  generateRandomSize(id) {
    var sizeObj = this.randomSizes.find((s) => s.id == id);
    if (sizeObj?.size) {
      return sizeObj.size;
    }
    var size = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    this.randomSizes = [...this.randomSizes, { id, size }];
    return size;
  },
};

const GameDetailsScreen = () => {
  const { language } = useAppContext();
  const { currentGame, currentGameDetails, setCurrentGameDetails, setStatus } =
    useGameContext();
  const filteredGameDetails = useMemo(
    () =>
      currentGameDetails.filter((detail) => detail.gameId == currentGame.id),
    [currentGameDetails]
  );
  return (
    <SafeAreaView className="flex-1 bg-[#333]">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row mt-5 mb-7 justify-between items-center">
          <TouchableOpacity
            className=" bg-[#aba969] rounded-full w-10 h-10 items-center justify-center mx-3"
            onPress={(e) => setStatus(gameStatusEnum.CreatePlayers)}
          >
            <ArrowLeftIcon size={25} color="#fff" />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Explanation language={language} msg={"Used"} color={"#1c8375"} />
            <Explanation language={language} msg={"NotUsed"} color={"#999"} />
          </View>
        </View>
        <Text className="text-white text-center text-xl">
          {Translator[language].ClickOnAWord}:
        </Text>
        <View className="flex-wrap flex-row p-2 justify-center mb-16">
          {filteredGameDetails.map((detail) => {
            return (
              <GameDetail
                key={detail.id}
                {...detail}
                setCurrentGameDetails={setCurrentGameDetails}
                filteredGameDetails={filteredGameDetails}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GameDetail = ({
  id,
  name,
  isUsed,
  setCurrentGameDetails,
  filteredGameDetails,
}) => {
  const changeWordUsage = () => {
    if (
      filteredGameDetails.filter((det) => det.isUsed).length <= 1 &&
      isUsed == true
    ) {
      return;
    }
    setCurrentGameDetails((prev) => {
      let updatedGameDetails = prev.map((detail) => {
        if (detail.id == id) {
          return { ...detail, isUsed: !detail.isUsed };
        }
        return detail;
      });
      const gameDetail = prev.filter((detail) => detail.id == id);
      return [...updatedGameDetails];
    });
  };
  return (
    <TouchableOpacity className="mx-2 mt-3 borde" onPress={changeWordUsage}>
      <Text
        className="text-white text-lg text-center"
        style={{
          fontSize: fontSizeRange.generateRandomSize(id),
          color: isUsed ? "#1c8375" : "#999",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const Explanation = ({ language, msg, color }) => {
  return (
    <View className="mx-1">
      <View className="flex-row-reverse space-x-3 items-center">
        <View className="w-5 h-5" style={{ backgroundColor: color }}></View>
        <Text className="text-white text-lg text-center mx-2">
          {Translator[language][msg]}
        </Text>
      </View>
    </View>
  );
};

export default GameDetailsScreen;
