import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
} from "react-native-heroicons/solid";
import useModal from "../common/hooks/useModal";
import GameModal from "./GameModal";
import { useNavigation } from "@react-navigation/native";
import { Translator } from "../Translation/Translator";
import { useAppContext } from "../common/AppContext";

const modalContent = {
  info: 1,
  translation: 2,
};

const Navbar = () => {
  const { showModal, modalVisible, hideModal } = useModal();
  const [whichModalContent, setWhichModalContent] = useState(1);
  const navigation = useNavigation();
  const { setLanguage, language } = useAppContext();
  return (
    <View className="w-full flex-row px-4 pt-10 pb-5 bg-[#333]">
      <TouchableOpacity
        onPress={() => navigation.navigate("GamesListScreen")}
        className="mr-2"
      >
        <HomeIcon size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showModal();
          setWhichModalContent(modalContent.info);
        }}
        className="mr-2"
      >
        <QuestionMarkCircleIcon size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showModal();
          setWhichModalContent(modalContent.translation);
        }}
      >
        <GlobeAltIcon size={25} color="#fff" />
      </TouchableOpacity>
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={hideModal}
        >
          <XCircleIcon size={20} color="#333" />
        </TouchableOpacity>
        {whichModalContent == modalContent.info ? (
          <Text className="text-center">{Translator[language].InfoMsg}</Text>
        ) : (
          <Languages hideModal={hideModal} setLanguage={setLanguage} />
        )}
      </GameModal>
    </View>
  );
};

const Languages = ({ hideModal, setLanguage }) => {
  return (
    <View>
      {Object.keys(Translator).map((key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            hideModal();
            setLanguage(key);
          }}
        >
          <Text className="text-lg bg-[#aba969] text-white mt-2 py-2 px-20">
            {key.toString()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Navbar;
