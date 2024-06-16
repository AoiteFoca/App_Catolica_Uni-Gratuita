// MeusDocumentosScreen.tsx
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Layout from "../components/layout";

const Documents: React.FC = () => {
  return (
    <Layout currentTab="Documents">
      <ScrollView className="flex-1 bg-white p-4 mt-10">
        <Text className="text-center text-xl font-bold mb-4">
          Meus Documentos
        </Text>

        <View className="mb-4 p-4 border-2 border-maroon rounded-md">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-semibold">Enviados</Text>
            <Text className="text-lg">2/6</Text>
          </View>
          <View className="mb-2 p-4 bg-gray-200 rounded-md flex-row justify-between items-center">
            <Text className="text-lg">Meus dados</Text>
            <View className="bg-blue-500 px-2 py-1 rounded-full">
              <Text className="text-white text-sm">OK</Text>
            </View>
          </View>
          <View className="p-4 bg-gray-200 rounded-md flex-row justify-between items-center">
            <Text className="text-lg">Da universidade</Text>
            <View className="bg-blue-500 px-2 py-1 rounded-full">
              <Text className="text-white text-sm">OK</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 p-4 border-2 border-maroon rounded-md">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-semibold">Pendentes</Text>
            <Text className="text-lg">4/6</Text>
          </View>
          {/* Adicione aqui os itens pendentes conforme necessário */}
        </View>
        <View className="w-full flex items-center justify-center ">
          <TouchableOpacity
            onPress={() => {
              /* Função para continuar enviando documentos */
            }}
            className="w-[300px] bg-blue-500 py-3 rounded-full mt-4 flex-row justify-center items-center"
          >
            <Text className="text-white font-bold text-lg">
              CONTINUAR ENVIANDO
            </Text>
            <Text className="text-white font-bold text-lg ml-2">→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Documents;
