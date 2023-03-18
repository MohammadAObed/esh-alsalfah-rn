import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../common/GamePlayContext";
import { gameStatusEnum } from "../common/gamePlayEnums";

function initialiseVoter(player) {
  return {
    voter: player,
  };
}

// const initialVote = {};

// const initialVoter = {
//   index: 0,
//   voter: {}
// }

const PlayersVotes = () => {
  const { players, setPlayers, setStatus, imposter } = useGameContext();
  const [votes, setVotes] = useState([]);
  const [currentVoter, setCurrentVoter] = useState(initialiseVoter(players[0]));
  const newVote = (votee) => {
    setVotes((prev) => {
      return [...prev, { voterId: currentVoter.voter.id, voteeId: votee.id }];
    });
    // console.log("votee", votee);
  };
  useEffect(() => {
    if (votes.length >= players.length) {
      let updatedPlayers = players.map((player) => {
        // console.log("votes", votes, player.id);
        let voter = votes.find((vote) => vote.voterId == player.id);
        if (voter == undefined || voter == null) {
          return player;
        }
        if (voter.voteeId === imposter.id) {
          return { ...player, points: player.points + 100 };
        }
        return player;
      });
      setPlayers((prevState) => {
        return updatedPlayers;
      });
      setStatus(gameStatusEnum.RevealImposter);
      return;
    }
    // console.log("🚀 ~ file: index.jsx:24 ~ PlayersVotes ~ votes", votes);
    // console.log(
    //   "🚀 ~ file: index.jsx:52 ~ setCurrentVoter ~ currentVoter",
    //   currentVoter
    // );

    setCurrentVoter((prev) => {
      const availableVoters = players.filter((player) => {
        return votes.some((v) => v.voterId == player.id) == false;
      });
      return {
        voter: availableVoters[0] || currentVoter,
      };
    });
  }, [votes]);
  return (
    <View className="flex-1 p-10 items-center justify-center">
      <Text className="text-white text-2xl -mt-20 text-center">
        <Text className="text-[#aba969]">{currentVoter.voter.name} </Text>
        اختار الشخص اللي تظن انه برا السالفة
      </Text>
      <ScrollView className="mt-5 space-y-5 max-h-96">
        {players
          .filter((p) => p.id !== currentVoter.voter.id)
          .map((p) => {
            return (
              <TouchableOpacity
                className="px-10 py-2.5 bg-red-800 rounded-sm"
                key={p.id}
                onPress={() => newVote(p)}
              >
                <Text className="text-white text-3xl">{p.name}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default PlayersVotes;
