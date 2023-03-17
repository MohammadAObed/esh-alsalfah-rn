import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import useModal from "../common/hooks/useModal";
import GameModal from "./GameModal";
import { useNavigation } from "@react-navigation/native";
const Navbar = () => {
  const { showModal, modalVisible, hideModal } = useModal();
  const navigation = useNavigation();
  return (
    <View className="w-full flex-row px-4 gap-x-2">
      <TouchableOpacity onPress={() => navigation.navigate("GamesListScreen")}>
        <HomeIcon size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={showModal}>
        <QuestionMarkCircleIcon size={25} color="#fff" />
      </TouchableOpacity>
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={hideModal}
        >
          <XCircleIcon size={20} color="#333" />
        </TouchableOpacity>
        <Text>اللعبة ممتازة جربها او لا تجربها ل</Text>
      </GameModal>
    </View>
  );
};

export default Navbar;
