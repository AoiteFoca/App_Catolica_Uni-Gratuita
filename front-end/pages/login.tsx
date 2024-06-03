import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Layout from "../components/layout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types/navigationTypes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAfterLogin = () => {
    navigation.navigate("AfterLoginView");
  };

  return (
    <Layout currentTab="Login">
      <View className="flex-1 bg-white">
        <View className="flex-[5] mt-[125px] items-center bg-white">
          <Text className="text-2xl text-red-900 font-bold">LOGIN</Text>
          <View className="w-[80%]">
            <Text className="text-2xl text-center text-#282828 pt-5">
              Preencha com os seus dados
            </Text>

            <View className="w-full pt-10 px-10">
              <Text className="text-lg text-red-900">CPF:</Text>
              {/*TextInput para cpf */}
              <TextInput
                className="h-[40px] mt-[10px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
                // style={styles.input}
              />
            </View>

            <View className="w-full pt-5 px-10">
              <Text className="text-lg text-red-900">Senha:</Text>
              {/*TextInput para senha */}
              <TextInput style={styles.input} secureTextEntry={true} />
            </View>

            <TouchableOpacity className="items-center pt-5">
              <Text className="text-red-900 underline text-base italic">
                esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
          {/* Botões  */}
          <View className=" pt-20 items-center">
            <TouchableOpacity
              className="rounded-full flex-row justify-around items-center bg-red-800 px-4 py-4 w-48"
              onPress={handleAfterLogin}
            >
              <Text className="text-white text-xl font-bold">ENTRAR</Text>
              <Text className="text-white right-2">
                <Icon name="arrow-right-long" size={25} />
              </Text>
            </TouchableOpacity>
          </View>
          <View className="pt-5">
            <TouchableOpacity>
              <Text className="text-red-900 underline font-bold text-base">
                entrar de outro modo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-[0.2] bg-red-900 justify-center items-"></View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#676767",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
});

export default LoginPage;
