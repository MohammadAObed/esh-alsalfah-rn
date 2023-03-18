import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import Game from "../components/GamesList_Game";
import GamesListJSON from "../common/data/gamesList.json";
const GamesListScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#333]">
      {/* <Navbar /> */}
      <ScrollView className="flex-1 p-4">
        <View className="relative flex-row flex-wrap justify-around">
          {GamesListJSON.map((game) => {
            return <Game key={game.id} {...game} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GamesListScreen;
