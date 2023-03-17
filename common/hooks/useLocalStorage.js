import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // console.log("Error Storing value", e);
    }
  };

  const getValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null && item !== undefined) {
        setValue((prev) => JSON.parse(item));
      } else {
        setValue((prev) => initialValue);
      }
    } catch (error) {
      // console.log("Error retrieving value:", error);
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  useEffect(() => {
    storeData();
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
