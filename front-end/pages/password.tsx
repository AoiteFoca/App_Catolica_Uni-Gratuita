import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const RePasswordPage = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>RePassword Page</Text>
      <TouchableOpacity onPress={handleGoBack} style={{ marginTop: 20 }}>
        <Text style={{ color: "#8B0000", fontStyle: "italic" }}>
          <Icon name="arrow-left" size={20} color="#8B0000" /> Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RePasswordPage;
