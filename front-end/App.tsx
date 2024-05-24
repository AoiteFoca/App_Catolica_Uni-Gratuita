import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1">
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
        <View className="mt-[60px] space-y-4 w-[70%] ">
          <TouchableOpacity className="rounded-full flex-row justify-between items-center bg-red-800 px-4 py-2 ">
            <Text className="w-full text-center text-white text-lg">
              USUÁRIO NOVO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full flex-row justify-between items-center bg-white border border-red-800 px-4 py-2">
            <Text className="w-full text-black text-lg text-center">
              JÁ TENHO CONTA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
