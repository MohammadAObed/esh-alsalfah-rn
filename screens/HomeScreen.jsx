import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../common/AppContext";
import useModal from "../common/hooks/useModal";
import GameModal from "../components/GameModal";
import { Translator } from "../Translation/Translator";
const HomeScreen = () => {
  const { modalVisible, showModal, hideModal } = useModal();
  const { language, playSound } = useAppContext();
  return (
    <SafeAreaView className="flex-1 bg-[#333] items-center">
      {/* <Navbar /> */}
      <HomeImage />
      <Play showModal={showModal} language={language} playSound={playSound} />
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        <Text className="mt-4 text-center mb-3">{Translator[language].InfoMsg}</Text>
        {/* <Text className="opacity-40 mt-10 text-sm">
          {Translator[language].ByMo} &#169;
        </Text> */}
      </GameModal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const Play = ({ showModal, language, playSound }) => {
  const navigation = useNavigation();
  return (
    <View className="w-full mb-10">
      <TouchableOpacity
        className="bg-[#aba969] mx-5 h-14 justify-center items-center rounded-md"
        onPress={() => {
          playSound();
          navigation.navigate("GamesListScreen");
        }}
      >
        <Text className="text-4xl font-bold text-white">{Translator[language].Play}</Text>
      </TouchableOpacity>
      <Text className="text-center mt-5 text-white text-lg" onPress={showModal}>
        {Translator[language].AboutGame}
      </Text>
    </View>
  );
};

const HomeImage = () => {
  return (
    <View className="flex-1 justify-center">
      <Image source={require("../assets/bookicon.png")} className="w-52 h-52 -mt-10" />
    </View>
  );
};
