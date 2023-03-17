import { useRef } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import { XCircleIcon } from "react-native-heroicons/solid";
function GameModal({ modalVisible, hideModal, children }) {
  const test = (e) => {};
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      onRequestClose={hideModal}
      transparent
    >
      <TouchableWithoutFeedback onPress={test}>
        <View className="flex-1 items-center justify-center bg-[#33333388] px-16">
          <View className="relative w-full h-32 px-4 bg-white justify-center items-center">
            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={hideModal}
            >
              {/* <XCircleIcon size={25} color="#333" /> */}
            </TouchableOpacity>
            {children || <Text>اللعبة ممتازة جربها او لا تجربها ل</Text>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default GameModal;
