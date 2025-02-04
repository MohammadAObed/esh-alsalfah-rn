import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { soundsEnum } from "../gamePlayEnums";

const useAudio = (soundEnum) => {
  const [sound, setSound] = useState();

  async function playSound() {
    // console.log("replaying Sound");
    // await sound.playAsync();
    await sound.replayAsync();
  }

  async function loadSound() {
    if (soundEnum == soundsEnum.Btn) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/audio/btn-click.wav"));
      // console.log("EnumBtn", soundsEnum.Btn);
      setSound(sound);
    } else if (soundEnum == soundsEnum.GameOver) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/audio/game-over.wav"));
      // console.log("EnumBtn", soundsEnum.GameOver);
      setSound(sound);
      // await sound.playFromPositionAsync()
      await sound.replayAsync();
    }
  }

  useEffect(() => {
    loadSound();
  }, []);

  return { playSound };
};

export default useAudio;

// import { useEffect, useState } from "react";
// import { Audio } from "expo-av";

// const useAudio = () => {
//   const [sound, setSound] = useState();

//   async function playSound() {
//     console.log("Loading Sound");
//     const { sound } = await Audio.Sound.createAsync(
//       require("../../assets/audio/btn-click.wav")
//     );
//     setSound(sound);

//     console.log("Playing Sound");
//     await sound.playAsync();
//   }

//   useEffect(() => {
//     return sound
//       ? () => {
//           console.log("Unloading Sound");
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   return { playSound };
// };

// export default useAudio;
