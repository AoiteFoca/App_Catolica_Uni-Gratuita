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
import Document1 from './pages/documents/document1';
import Document2 from './pages/documents/document2';
import Document3 from './pages/documents/document3';
import Document4 from './pages/documents/document4';
import Document5 from './pages/documents/document5';
import Document6 from './pages/documents/document6';
import Document7 from './pages/documents/document7';
import Document8 from './pages/documents/document8';
import Document9 from './pages/documents/document9';
import Document10 from './pages/documents/document10';
import Document11 from './pages/documents/document11';
import Document12 from './pages/documents/document12';
import Document13 from './pages/documents/document13';
import Document14 from './pages/documents/document14';
import Document15 from './pages/documents/document15';
import DocumentFinish from './pages/documents/documentFinish';
import { RootStackParamList } from './pages/types/navigationTypes';

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
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
