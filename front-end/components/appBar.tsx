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
        onPress={() => navigation.navigate("AvisosPage")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "AvisosPage" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={
              currentTab === "AvisosPage"
                ? "notifications"
                : "notifications-outline"
            }
            size={28}
            color={currentTab === "AvisosPage" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[
            styles.text,
            currentTab === "AvisosPage" && styles.activeText,
          ]}
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
        onPress={() => navigation.navigate("AfterLogin")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "AfterLogin" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={currentTab === "AfterLogin" ? "home" : "home-outline"}
            size={28}
            color={currentTab === "AfterLogin" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[
            styles.text,
            currentTab === "AfterLogin" && styles.activeText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "Profile" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={currentTab === "Profile" ? "person" : "person-outline"}
            size={28}
            color={currentTab === "Profile" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[styles.text, currentTab === "Profile" && styles.activeText]}
        >
          Perfil
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserInfos")}
        style={styles.button}
      >
        <View
          style={[
            styles.iconContainer,
            currentTab === "UserInfos" && styles.activeIconContainer,
          ]}
        >
          <Ionicons
            name={
              currentTab === "UserInfos"
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline"
            }
            size={28}
            color={currentTab === "UserInfos" ? "#7d0a16" : "white"}
          />
        </View>
        <Text
          style={[styles.text, currentTab === "UserInfos" && styles.activeText]}
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
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
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
