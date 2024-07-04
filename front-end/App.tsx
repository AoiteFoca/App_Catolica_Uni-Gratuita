import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Toast from "react-native-toast-message";
import { TailwindProvider } from "tailwindcss-react-native";
import Document1 from "./pages/document1";
import Documents from "./pages/documents";
import LandingPage from "./pages/landing";
import LoaderPage from "./pages/loaderPage";
import LoginPage from "./pages/login";
import RePassword from "./pages/password";
import RegisterPage from "./pages/register";
import { RootStackParamList } from "./pages/types/navigationTypes";
import AfterLogin from "./pages/afterLogin";
import Profile from "./pages/profile";

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
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
