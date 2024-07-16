// StyledInput.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
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
  secureTextEntry?: boolean;
  format?: (value: string) => string; // Nova propriedade para formatação
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
  secureTextEntry = false,
  format, // Propriedade de formatação adicionada
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Função para aplicar a formatação, se existir
  const applyFormat = (text: string) => {
    return format ? format(text) : text;
  };

  return (
    <View style={styles.container}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput
        className="text-sm"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(applyFormat(text))}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType}
        placeholderTextColor="#666"
        secureTextEntry={isPasswordVisible}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
      {error && touched && (
        <Text
          style={[
            styles.errorText,
            secureTextEntry ? styles.errorTextBelow : {},
          ]}
        >
          {error}
        </Text>
      )}
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
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
  errorTextBelow: {
    marginLeft: 0,
    marginTop: 5,
    alignSelf: "flex-start",
  },
});

export default StyledInput;
