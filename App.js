import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { GameContextProvider } from "./common/GamePlayContext";
import Navbar from "./components/Navbar";
import GamePlayScreen from "./screens/GamePlayScreen";
import GamesListScreen from "./screens/GamesListScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float"
        screenOptions={{ header: () => <Navbar /> }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="GamesListScreen"
          component={GamesListScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="GamePlayScreen"
          component={GamePlayScreen}
          options={{ animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
