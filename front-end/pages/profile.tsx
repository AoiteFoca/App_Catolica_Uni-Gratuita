import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layout";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <Layout currentTab="Profile">
      <View className="flex-1 bg-white p-5 mt-5">
        <TouchableOpacity className="mb-5" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center mb-7 mt-16">
          <View className="mr-5">
            <Image
              className="w-20 h-20 rounded-xl bg-gray-300"
              source={{ uri: "https://via.placeholder.com/150" }}
            />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold">Fulano S. da Silva</Text>
            <Text className="text-stone-700 mb-1">Católica SC</Text>
            <TouchableOpacity>
              <Text className="text-red-900 underline">Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-[20px] text-stone-600 font-bold mb-4 mt-8 ml-5">
          PERFIL
        </Text>
        <View className="ml-5 mb-7">
          <TouchableOpacity className="flex-row items-center mb-5 mt-1">
            <Ionicons name="mail-outline" size={38} color="#742a2a" />
            <Text className="ml-4 text-base text-stone-700">
              Alterar e-mail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mb-5 mt-1">
            <Ionicons name="lock-closed-outline" size={38} color="#742a2a" />
            <Text className="ml-4 text-base text-stone-700">Alterar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mb-5 mt-1">
            <Ionicons name="log-out-outline" size={38} color="#742a2a" />
            <Text className="ml-4 text-base text-stone-700">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Profile;
