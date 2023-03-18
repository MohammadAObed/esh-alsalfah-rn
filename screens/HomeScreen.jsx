import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useModal from "../common/hooks/useModal";
import { XCircleIcon } from "react-native-heroicons/solid";
import GameModal from "../components/GameModal";
import Navbar from "../components/Navbar";
import { Translator } from "../Translation/Translator";
import { useAppContext } from "../common/AppContext";
const HomeScreen = () => {
  const { modalVisible, showModal, hideModal } = useModal();
  const { language } = useAppContext();
  return (
    <SafeAreaView className="flex-1 bg-[#333] items-center">
      {/* <Navbar /> */}
      <HomeImage />
      <Play showModal={showModal} language={language} />
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        <Text>اللعبة ممتازة جربها او لا تجربها ل</Text>
      </GameModal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const Play = ({ showModal, language }) => {
  const navigation = useNavigation();
  return (
    <View className="w-full mb-10">
      <TouchableOpacity
        className="bg-[#aba969] mx-5 h-14 justify-center items-center rounded-md"
        onPress={() => navigation.navigate("GamesListScreen")}
      >
        <Text className="text-4xl font-bold text-white">
          {Translator[language].Play}
        </Text>
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
      <Image
        source={require("../assets/bookicon.png")}
        className="w-52 h-52 -mt-10"
      />
    </View>
  );
};
