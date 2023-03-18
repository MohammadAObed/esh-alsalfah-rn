import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGameContext } from "../common/GamePlayContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayersLobby from "./PlayersLobby";
import PlayersRoles from "./PlayersRoles";
import PlayersQuestions from "./PlayersQuestions";
import PlayersAdditionalQuestions from "./PlayersAdditionalQuestions";
import PlayersVotes from "./PlayersVotes";
import PlayersImposter from "./PlayersImposter";
import PlayersImposterAnswer from "./PlayersImposterAnswer";
import PlayersPoints from "./PlayersPoints";
import PlayersRoundEnd from "./PlayersRoundEnd";
import { gameStatusEnum } from "../common/gamePlayEnums";
import Navbar from "./Navbar";

const GamePlay = () => {
  const { status } = useGameContext();
  return (
    <SafeAreaView className="flex-1 bg-[#333]">
      {/* <Navbar /> */}
      {status === gameStatusEnum.CreatePlayers && <PlayersLobby />}
      {status === gameStatusEnum.RevealRoles && <PlayersRoles />}
      {status === gameStatusEnum.Questions && <PlayersQuestions />}
      {status === gameStatusEnum.AdditionalQuestions && (
        <PlayersAdditionalQuestions />
      )}
      {status === gameStatusEnum.Voting && <PlayersVotes />}
      {status === gameStatusEnum.RevealImposter && <PlayersImposter />}
      {status === gameStatusEnum.ImposterAnswer && <PlayersImposterAnswer />}
      {status === gameStatusEnum.ShowPoints && <PlayersPoints />}
      {status === gameStatusEnum.RoundEnd && <PlayersRoundEnd />}
    </SafeAreaView>
  );
};

export default GamePlay;
