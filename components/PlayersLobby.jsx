import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useAppContext } from "../common/AppContext";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";
import usePlayerStuff from "../common/hooks/usePlayerStuff";
import { Translator } from "../Translation/Translator";
import GameModal from "./GameModal";

//!!!! Aleeeert, if textinput parameter (e) sometimes its a string, sometimes its an object and to get the string (sender.nativeEvent.text)

const PlayersLobby = () => {
  const { language, playSound } = useAppContext();
  //setPlayers will invoke the useEffect with useLocalStorage
  const { players, setPlayers, showModal, hideModal, modalVisible, setStatus, currentGame } = useGameContext();
  const { isPlayersEmpty, removePlayer, addPlayer } = usePlayerStuff(players, setPlayers);
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

  const styleByLanguage = language == "AR" ? "text-right" : " text-left";

  // const inputRef = useRef(null);

  // const handleButtonClick = () => {
  //   inputRef.current.focus();
  // };
  return (
    <View className="flex-1 p-10 justify-between">
      <Text className={`${styleByLanguage} text-white text-3xl`}>{Translator[language].ChoosePlayers}</Text>
      <ScrollView className="flex-1 max-h-80">
        {isPlayersEmpty ? (
          <>
            <Text className={`${styleByLanguage} text-3xl text-red-400`}>{Translator[language].NoPlayersFound}</Text>
            <Text className={`${styleByLanguage} text-3xl text-red-400`}>{Translator[language].Min3}</Text>
          </>
        ) : (
          players.map((player) => {
            return <Player key={player.id} {...player} removePlayer={removePlayer} language={language} playSound={playSound}></Player>;
          })
        )}
      </ScrollView>
      <View className={`${language == "AR" ? "flex-row" : " flex-row-reverse"} mb-5 justify-between items-center`}>
        <TouchableOpacity
          className="px-4 py-4 bg-[#aba969] rounded-full"
          onPress={(e) => {
            playSound();
            showModal(e);
          }}
        >
          <PlusIcon size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          className="px-10 py-2.5 bg-[#aba969] rounded-sm"
          onPress={() => {
            playSound();
            nextOnPress();
          }}
          disabled={players.length < 3 ? true : false}
          style={{ opacity: players.length < 3 ? 0.5 : 1 }}
        >
          <Text className="text-white text-3xl">{Translator[language].Next}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          playSound();
          setStatus(gameStatusEnum.ModifyGame);
        }}
        className="px-10 py-2.5 bg-[#aba969] rounded-sm"
      >
        <Text className="text-white text-3xl text-center">{Translator[language].ModifyGame}</Text>
      </TouchableOpacity>
      <AddPlayerModal
        hideModal={hideModal}
        modalVisible={modalVisible}
        playSound={playSound}
        handleSubmit={handleSubmit}
        handleTextChange={handleTextChange}
        playerInput={playerInput}
        language={language}
      />
    </View>
  );
};

export default PlayersLobby;

const Player = ({ name, points, id, removePlayer, language, playSound }) => {
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
          playSound();
          removePlayer(id);
        }}
      >
        <MinusIcon size={25} color="#fff" />
      </TouchableOpacity>
      <Text className="text-white text-3xl">{name}</Text>
    </View>
  );
};

const AddPlayerModal = ({ hideModal, modalVisible, playSound, handleSubmit, handleTextChange, playerInput, language }) => {
  return (
    <GameModal hideModal={hideModal} modalVisible={modalVisible}>
      <View className="flex-row mt-3">
        <TouchableOpacity
          className="px-5 py-1 bg-[#aba969] rounded-sm"
          onPress={() => {
            playSound();
            handleSubmit();
          }}
        >
          <Text className="text-white text-2xl">{Translator[language].Add}</Text>
        </TouchableOpacity>
        <TextInput
          className="bg-[#333] text-white flex-1 px-2 py-2 text-right"
          placeholder={`${Translator[language].AddPlayer}`}
          onChange={handleTextChange}
          value={playerInput}
          // ref={inputRef}
          onSubmitEditing={handleSubmit}
          autoFocus={true}
        />
      </View>
    </GameModal>
  );
};
