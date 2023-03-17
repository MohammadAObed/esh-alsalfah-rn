import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../images";
const Game = ({ name, imgUrl, id }) => {
  const newImgUrl = "../" + imgUrl;
  const navigation = useNavigation();

  const isChangeImageFit = [1, 2].includes(id);
  return (
    <View className="border border-white w-36 h-52 mt-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("GamePlayScreen", { id })}
      >
        <View className="w-full" /* id={`game-${id}`} */>
          <Text className="absolute text-4xl text-white z-10 top-3 self-center">
            {name}
          </Text>
          <View className="w-full h-full items-center justify-center ">
            {/* items-center justify-center works well with isChangeImageFit below, bcz they are not full w and h */}
            <Image
              source={images[id]?.uri}
              className={`object-contain ${
                isChangeImageFit ? `w-32 h-32` : `h-full w-full`
              }`}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Game;
