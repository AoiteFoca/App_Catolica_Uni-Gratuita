// StyledInput.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface StyledInputProps {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string;
  touched?: boolean;
}

const StyledInput: React.FC<StyledInputProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  keyboardType = "default",
  error,
  touched,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType}
        placeholderTextColor="#666"
      />
      {error && touched ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#b0b0b0",
    marginBottom: 15,
    position: "relative",
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
});

export default StyledInput;
