import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue, shouldReset = undefined) {
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
        const data = JSON.parse(item);
        const reset = shouldReset != undefined && shouldReset?.(data);
        setValue((prev) => (reset ? initialValue : data));
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
