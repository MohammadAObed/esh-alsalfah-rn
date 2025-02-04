import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GlobeAltIcon, HomeIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import { Translator } from "../Translation/Translator";
import { useAppContext } from "../common/AppContext";
import useModal from "../common/hooks/useModal";
import GameModal from "./GameModal";

const modalContent = {
  info: 1,
  translation: 2,
};

const Navbar = () => {
  const { showModal, modalVisible, hideModal } = useModal();
  const [whichModalContent, setWhichModalContent] = useState(1);
  const navigation = useNavigation();
  const { setLanguage, language, playSound } = useAppContext();
  return (
    <View className="w-full flex-row px-4 pt-10 pb-5 bg-[#333]">
      <TouchableOpacity
        onPress={() => {
          playSound();
          navigation.navigate("GamesListScreen");
        }}
        className="mr-2"
      >
        <HomeIcon size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          playSound();
          showModal();
          setWhichModalContent(modalContent.info);
        }}
        className="mr-2"
      >
        <QuestionMarkCircleIcon size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          playSound();
          showModal();
          setWhichModalContent(modalContent.translation);
        }}
      >
        <GlobeAltIcon size={25} color="#fff" />
      </TouchableOpacity>
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        {whichModalContent == modalContent.info ? (
          <Credits Translator={Translator} language={language} />
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
          <Text className="text-lg bg-[#aba969] text-white mt-2 py-2 px-20">{key.toString()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Credits = ({ Translator, language }) => {
  return (
    <View>
      <Text className="mt-2 text-center mb-3">{Translator[language].InfoMsg}</Text>
      {/* <Text className="mt-10 text-sm text-center">
        {Translator[language].Credits}
      </Text>
      <View>
        <ScrollView className=" max-h-16 mt-2">
          <View className="w-full items-center p-2 pt-0">
            <Text className="text-center opacity-40">
              {Translator[language].GameInspiredBy} "برا السالفة"
            </Text>
            <Text className="text-center opacity-40">
              Images From Vecteezy:
            </Text>
            <Text className="text-center opacity-40">abderraouf omara</Text>
            <Text className="text-center opacity-40">jellyfishwater</Text>
            <Text className="text-center opacity-40">muhamadbintangkresna</Text>
            <Text className="text-center opacity-40">nightwolfdezines</Text>
            <Text className="text-center opacity-40">template.net</Text>
          </View>
        </ScrollView>
      </View> */}
      {/* <Text className="opacity-40 mt-10 text-sm text-center">
        {Translator[language].ByMo} &#169;
      </Text> */}
    </View>
  );
};

export default Navbar;
