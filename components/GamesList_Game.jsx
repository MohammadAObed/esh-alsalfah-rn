import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../images";
const Game = ({ name, imgUrl, id }) => {
  const newImgUrl = "../" + imgUrl;
  const navigation = useNavigation();

  return (
    <View className="border border-white w-36 h-52 mt-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("GamePlayScreen", { id })}
      >
        <View className="w-full" /* id={`game-${id}`} */>
          <Text className="absolute text-4xl text-[#333] z-10 top-3 self-center">
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
