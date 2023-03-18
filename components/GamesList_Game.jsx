import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../images";
const Game = ({ name, imgUrl, id }) => {
  // const newImgUrl = "../" + imgUrl;
  const navigation = useNavigation();
  // box-shadow: 2px 5px 1px rgba(0, 0, 0, 0.1);
  // background-color: rgb(125, 129, 133);
  return (
    <View className="relative w-36 h-52 my-6">
      <View className="absolute w-full h-full rotate-6 bg-[#4d4c3a] "></View>
      <View className="absolute w-screen h-1.5 -bottom-2 -right-10 bg-[#7D8085] shadow-md"></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("GamePlayScreen", { id })}
      >
        <View className="w-full" /* id={`game-${id}`} */>
          <Text className="absolute text-4xl text-[#333] z-10 top-3 self-center text-center">
            {name}
          </Text>
          <View className="w-full h-full items-center">
            <Image source={images[id]?.uri} className="h-full w-full" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Game;
