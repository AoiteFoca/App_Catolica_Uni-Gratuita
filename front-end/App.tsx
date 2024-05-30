import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TailwindProvider } from "tailwindcss-react-native";
import LandingPage from "./pages/landing";
import LoaderPage from "./pages/loaderPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Login") {
            iconName = "log-in-outline";
          } else if (route.name === "Register") {
            iconName = "person-add-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={LandingPage} />
      <Tab.Screen name="Login" component={LoginPage} />
      <Tab.Screen name="Register" component={RegisterPage} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loader">
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false, animationEnabled: false }}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
