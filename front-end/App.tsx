import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={LandingPage}
            options={{ headerShown: false }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
