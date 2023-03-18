import React, { useState, useEffect } from "react";
// import gameOverSound from "../assets/audio/game-over.wav";
import { getRandomItemFromArray } from "../common/utils";
import { useGameContext } from "../common/GamePlayContext";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { gameStatusEnum } from "../common/gamePlayEnums";
import { useAppContext } from "../common/AppContext";
import { Translator } from "../Translation/Translator";

const PlayersImposter = () => {
  const { players, imposter, setStatus } = useGameContext();
  const [playerName, setPlayerName] = useState("");
  const [stopAnim, setStopAnim] = useState(false);
  const { language } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      const player = getRandomItemFromArray(players);
      setPlayerName(player.name);
      // console.log("Interval running...");
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setStopAnim(true);
      setPlayerName(imposter.name);
    }, 3000);
    // const audio = new Audio(gameOverSound);
    // audio.play();
    // audio.playbackRate = 1.3;
    return () => {
      clearInterval(interval);
      // clearInterval(intervalAudio);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <View className="flex-1 p-10 items-center justify-between">
      <View className="fle1 mt-6">
        <Text className="text-white text-3xl mb-6">
          {Translator[language].TheImposterIs}
        </Text>
        <View className="relative items-center justify-center">
          <Image
            source={require("../assets/images/imposter-reveal-circle.png")}
            className="w-48 h-48"
          />
          <Text className="text-red-600 text-3xl absolute">{playerName}</Text>
        </View>
      </View>
      {stopAnim && (
        <TouchableOpacity
          onPress={(e) => {
            setStatus((prev) => gameStatusEnum.ImposterAnswer);
            // playBtnClickSound();
          }}
          className="px-10 py-2.5 bg-[#aba969] rounded-sm mt-6"
        >
          <Text className="text-white text-3xl">
            {Translator[language].Next}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayersImposter;
