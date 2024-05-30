// components/AppBottomBar.tsx
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../pages/types/navigationTypes";

const AppBottomBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Ionicons name="home-outline" size={24} color="gray" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Ionicons name="log-in-outline" size={24} color="gray" />
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      >
        <Ionicons name="person-add-outline" size={24} color="gray" />
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: "gray",
  },
});

export default AppBottomBar;
