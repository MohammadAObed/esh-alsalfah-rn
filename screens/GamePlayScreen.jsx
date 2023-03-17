import { View, Text } from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import { useRoute } from "@react-navigation/native";
import { GameContextProvider } from "../common/GamePlayContext";
import GamePlay from "../components/GamePlay";

const GamePlayScreen = () => {
  const {
    params: { id },
  } = useRoute();
  return (
    <GameContextProvider>
      <GamePlay />
    </GameContextProvider>
  );
};

export default GamePlayScreen;
