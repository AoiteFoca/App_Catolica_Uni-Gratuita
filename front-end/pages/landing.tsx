import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Landing">;

export default function LandingPage() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View className="flex-1 bg-white">
      <View className="flex-[2] bg-red-800 justify-center items-center">
        {/* Quadrados Brancos  */}
        <View className="flex-row space-x-4">
          <View className="w-[100px] h-[100px] bg-white"></View>
          <View className="w-[100px] h-[100px] bg-white"></View>
          <View className="w-[100px] h-[100px] bg-white"></View>
        </View>
      </View>
      <View className="flex-[5] mt-[125px] items-center bg-white">
        <Text className="text-2xl text-red-800 font-bold">Bem vindo(a)!</Text>
        <View className="w-[70%]">
          <Text className="text-lg text-center text-black">
            Cadastre-se ou faça login para continuar
          </Text>
        </View>
        {/* Botões  */}
        <View className="mt-[60px] space-y-4 w-[60%] ">
          <TouchableOpacity
            className="rounded-full flex-row justify-between items-center bg-red-800 px-4 py-2"
            onPress={handleRegister}
          >
            <Text className="w-full text-center text-white text-lg  font-bold">
              USUÁRIO NOVO
            </Text>
            <Text className="text-white right-6">
              <Icon name="arrow-right-long" size={18} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full flex-row justify-between items-center bg-white border border-red-800 px-4 py-2"
            onPress={handleLogin}
          >
            <Text className="w-full text-black text-lg text-center font-bold">
              JÁ TENHO CONTA
            </Text>
            <Text className="text-black right-6">
              <Icon name="arrow-right-long" size={18} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
