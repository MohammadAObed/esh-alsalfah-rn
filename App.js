import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { GameContextProvider } from "./common/GamePlayContext";
import GamePlayScreen from "./screens/GamePlayScreen";
import GamesListScreen from "./screens/GamesListScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GamesListScreen"
          component={GamesListScreen}
          options={{ animation: "slide_from_left", headerShown: false }}
        />
        <Stack.Screen
          name="GamePlayScreen"
          component={GamePlayScreen}
          options={{ animation: "slide_from_left", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
