import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import Documents from "./pages/documents";
import LandingPage from "./pages/landing";
import LoaderPage from "./pages/loaderPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import RePassword from "./pages/password";
import Document1 from "./pages/document1";
import { RootStackParamList } from "./pages/types/navigationTypes";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loader">
          <Stack.Screen
            name="Home"
            component={LandingPage}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loader"
            component={LoaderPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Documents"
            component={Documents}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RePassword"
            component={RePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document1"
            component={Document1}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;