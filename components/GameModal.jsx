import { useRef } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useAppContext } from "../common/AppContext";
import { Translator } from "../Translation/Translator";
// import { XCircleIcon } from "react-native-heroicons/solid";
function GameModal({ modalVisible, hideModal, children }) {
  const { language } = useAppContext();

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
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
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={hideModal}
            >
              <XCircleIcon size={23} color="#333" />
            </TouchableOpacity>
            {children || (
              <Text className="mt-4 text-center">
                {Translator[language].InfoMsg}
              </Text>
            )}
            {/* <Text className="opacity-40 mt-10 text-sm">
              {Translator[language].ByMo} &#169;
            </Text> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default GameModal;
