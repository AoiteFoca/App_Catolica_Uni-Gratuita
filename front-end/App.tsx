import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { AppState } from 'react-native';
import Toast from "react-native-toast-message";
import { TailwindProvider } from "tailwindcss-react-native";
import AfterLogin from "./pages/afterLogin";
import Avisos from "./pages/avisos";
import Documents from "./pages/documents";
import Document1 from "./pages/documents/document1";
import Document10 from "./pages/documents/document10";
import Document11 from "./pages/documents/document11";
import Document12 from "./pages/documents/document12";
import Document13 from "./pages/documents/document13";
import Document14 from "./pages/documents/document14";
import Document15 from "./pages/documents/document15";
import Document2 from "./pages/documents/document2";
import Document3 from "./pages/documents/document3";
import Document4 from "./pages/documents/document4";
import Document5 from "./pages/documents/document5";
import Document6 from "./pages/documents/document6";
import Document7 from "./pages/documents/document7";
import Document8 from "./pages/documents/document8";
import Document9 from "./pages/documents/document9";
import DocumentFinish from "./pages/documents/documentFinish";
import LandingPage from "./pages/landing";
import LoaderPage from "./pages/loaderPage";
import LoginPage from "./pages/login";
import RePassword from "./pages/password";
import Profile from "./pages/profile";
import RegisterPage from "./pages/register";
import { RootStackParamList } from "./pages/types/navigationTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./services/api";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  useEffect(() => {
    const teste = setTimeout(AsyncStorage.clear, 10000);

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      clearTimeout(teste);
      clearCache();
      handleAppStateChange("inactive");
    }
  })

  const clearCache = async () => {
    AsyncStorage.clear();
    console.log(await api.getItem("token"));
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      clearCache(); // Também limpa o cache quando o aplicativo vai para o fundo
    }
  };

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
            name="Landing"
            component={LandingPage}
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
          <Stack.Screen
            name="AfterLogin"
            component={AfterLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document2"
            component={Document2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document3"
            component={Document3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document4"
            component={Document4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document5"
            component={Document5}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document6"
            component={Document6}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document7"
            component={Document7}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document8"
            component={Document8}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document9"
            component={Document9}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document10"
            component={Document10}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document11"
            component={Document11}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document12"
            component={Document12}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document13"
            component={Document13}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document14"
            component={Document14}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Document15"
            component={Document15}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DocumentFinish"
            component={DocumentFinish}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AvisosPage"
            component={Avisos}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;