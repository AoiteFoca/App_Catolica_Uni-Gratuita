// components/AppBottomBar.tsx
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../pages/types/navigationTypes";

interface AppBottomBarProps {
  currentTab: string;
}

const AppBottomBar: React.FC<AppBottomBarProps> = ({ currentTab }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Documents")}
        style={styles.button}
      >
        <Ionicons
          name={currentTab == "Documents" ? "document" : "document-outline"}
          size={24}
          color="white"
        />
        <Text
          style={[styles.text, currentTab === "Login" && styles.activeText]}
        >
          Documentos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Ionicons
          name={currentTab === "Home" ? "home" : "home-outline"}
          size={24}
          color="white"
        />
        <Text style={[styles.text, currentTab === "Home" && styles.activeText]}>
          Menu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Ionicons name="person-outline" size={24} color="white" />
        <Text
          style={[styles.text, currentTab === "Profile" && styles.activeText]}
        >
          Perfil
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Ionicons name="ellipsis-horizontal-outline" size={24} color="white" />
        <Text
          style={[
            styles.text,
            currentTab === "MoreOptions" && styles.activeText,
          ]}
        >
          Mais opções
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#7d0a16",
    borderRadius: 15,
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: "white",
  },
  activeText: {
    fontWeight: "bold",
  },
});

export default AppBottomBar;
