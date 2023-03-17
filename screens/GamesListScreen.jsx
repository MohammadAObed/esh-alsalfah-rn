import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import Game from "../components/GamesList_Game";
import GamesListJSON from "../common/data/gamesList.json";
const GamesListScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-10 bg-[#333]">
      <Navbar />
      <View className="flex-1 p-4">
        <View className="container">
          <View className="flex-row flex-wrap justify-around">
            {GamesListJSON.map((game) => {
              return <Game key={game.id} {...game} />;
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GamesListScreen;
