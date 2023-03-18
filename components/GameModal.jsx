import { useRef } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAppContext } from "../common/AppContext";
import { Translator } from "../Translation/Translator";
// import { XCircleIcon } from "react-native-heroicons/solid";
function GameModal({ modalVisible, hideModal, children }) {
  const { language } = useAppContext();

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      onRequestClose={hideModal}
      transparent
    >
      <TouchableWithoutFeedback>
        <View className="relative flex-1 items-center justify-center bg-[#33333388]">
          <TouchableOpacity
            className="absolute w-full h-full bg-[#3333333]"
            onPress={hideModal}
          ></TouchableOpacity>
          <View className="w-64 p-4 pt-8 bg-white items-center">
            {children || (
              <Text className="mt-12 text-center">
                {Translator[language].InfoMsg}
              </Text>
            )}
            <Text className="opacity-40 mt-10 text-sm">
              {Translator[language].ByMo} &#169;
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default GameModal;
