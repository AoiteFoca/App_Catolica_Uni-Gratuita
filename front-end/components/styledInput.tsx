import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StyledInput = ({ icon, placeholder, value, onChangeText }: any) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    color: "#000",
    fontSize: 16,
  },
});

export default StyledInput;
