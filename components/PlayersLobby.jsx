import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useGameContext } from "../common/GamePlayContext";
import usePlayerStuff from "../common/hooks/usePlayerStuff";
import { gameStatusEnum } from "../common/gamePlayEnums";
import GameModal from "./GameModal";
import { MinusIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import { useAppContext } from "../common/AppContext";
import { Translator } from "../Translation/Translator";

//!!!! Aleeeert, if textinput parameter (e) sometimes its a string, sometimes its an object and to get the string (sender.nativeEvent.text)

const PlayersLobby = () => {
  const { language } = useAppContext();

  //setPlayers will invoke the useEffect with useLocalStorage
  const { players, setPlayers, showModal, hideModal, modalVisible, setStatus } =
    useGameContext();
  const { isPlayersEmpty, removePlayer, addPlayer } = usePlayerStuff(
    players,
    setPlayers
  );
  const [playerInput, setPlayerInput] = useState(""); //will cause rerender to whole component, but react recommends to use controlled input so ask further
  const handleSubmit = (e) => {
    // handleButtonClick();
    if (!playerInput) return;
    addPlayer(playerInput);
    setPlayerInput("");

    hideModal();
  };
  const nextOnPress = (e) => {
    if (players.length < 3) {
      return;
    }
    setStatus(gameStatusEnum.RevealRoles);
  };

  const handleTextChange = (sender) => {
    setPlayerInput(sender.nativeEvent.text);
  };

  // const inputRef = useRef(null);

  // const handleButtonClick = () => {
  //   inputRef.current.focus();
  // };
  return (
    <View className="flex-1 p-10 justify-between">
      <Text className="text-white text-3xl">
        {Translator[language].ChoosePlayers}
      </Text>
      <ScrollView className="flex-1 max-h-80">
        {isPlayersEmpty ? (
          <Text className="text-3xl text-red-400">لا يوجد لاعبين</Text>
        ) : (
          players.map((player) => {
            return (
              <Player
                key={player.id}
                {...player}
                removePlayer={removePlayer}
                language={language}
              ></Player>
            );
          })
        )}
      </ScrollView>
      <View className="mb-5 justify-between flex-row items-center">
        <TouchableOpacity
          className="px-4 py-4 bg-[#aba969] rounded-full"
          onPress={(e) => {
            showModal(e);
          }}
        >
          <PlusIcon size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-2.5 bg-[#aba969] rounded-sm"
          onPress={() => {
            nextOnPress();
          }}
          disabled={players.length < 3 ? true : false}
          style={{ opacity: players.length < 3 ? 0.5 : 1 }}
        >
          <Text className="text-white text-3xl">
            {Translator[language].Next}
          </Text>
        </TouchableOpacity>
      </View>
      <GameModal hideModal={hideModal} modalVisible={modalVisible}>
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={hideModal}
        >
          <XCircleIcon size={20} color="#333" />
        </TouchableOpacity>
        <View className="flex-row mt-3">
          <TouchableOpacity
            className="px-5 py-1 bg-[#aba969] rounded-sm"
            onPress={handleSubmit}
          >
            <Text className="text-white text-2xl">ضيف</Text>
          </TouchableOpacity>
          <TextInput
            className="bg-[#333] text-white flex-1 px-2 py-2 text-right"
            placeholder="ضيف لاعب"
            onChange={handleTextChange}
            value={playerInput}
            // ref={inputRef}
            onSubmitEditing={handleSubmit}
            autoFocus={true}
          />
        </View>
      </GameModal>
    </View>
  );
};

export default PlayersLobby;

const Player = ({ name, points, id, removePlayer, language }) => {
  return (
    <View
      className={`${
        language == "AR" ? "flex-row" : " flex-row-reverse"
      } justify-between items-center bg-[#30373D] border border-[#2B3137] py-2 px-3`}
    >
      <TouchableOpacity
        className="px-4 py-4 bg-[#aba969] rounded-full w-14"
        onPress={() => {
          // console.log("🚀 ~ file: PlayersLobby.jsx:130 ~ Player ~ id:", id);
          removePlayer(id);
        }}
      >
        <MinusIcon size={25} color="#fff" />
      </TouchableOpacity>
      <Text className="text-white text-3xl">{name}</Text>
    </View>
  );
};
