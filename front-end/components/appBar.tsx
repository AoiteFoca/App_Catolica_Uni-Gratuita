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
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "Home" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={
              currentTab === "Home"
                ? "home"
                : "home-outline"
            }
            size={28}
            color={currentTab === "Home" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[styles.text, currentTab === "Home" && styles.activeText]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "Notices" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={
              currentTab === "Notices"
                ? "notifications"
                : "notifications-outline"
            }
            size={28}
            color={currentTab === "Notices" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[styles.text, currentTab === "Notices" && styles.activeText]}
        >
          Avisos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Documents")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "Documents" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={currentTab == "Documents" ? "document" : "document-outline"}
            size={28}
            color={currentTab === "Documents" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[styles.text, currentTab === "Documents" && styles.activeText]}
        >
          Documentos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Document1")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "Document1" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={
              currentTab === "Document1"
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline"
            }
            size={28}
            color={currentTab === "Document1" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[
            styles.text,
            currentTab === "Document1" && styles.activeText,
          ]}
        >
          Outros
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#7d0a16",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 110,
  },
  button: {
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    padding: 10,
    marginBottom: 5,
  },
  activeIconContainer: {
    backgroundColor: "white",
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
