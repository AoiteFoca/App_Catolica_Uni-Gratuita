import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const RegisterPage = () => {
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Função de registro
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[5] mt-[75px] items-center bg-white">
        <Text className="text-2xl text-red-900 font-bold">NOVO CADASTRO</Text>
        <View className="w-[80%]">
          <Text className="text-2xl text-center text-#282828 pt-2">
            Preencha com os seus dados
          </Text>

          <View className="w-full mt-10 px-10">
            <Text className="text-lg text-red-900">Nome Completo:</Text>
            <TextInput
              className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View className="w-full mt-4 px-10">
            <Text className="text-lg text-red-900">CPF:</Text>
            <TextInput
              className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>

          <View className="w-full mt-4 px-10">
            <Text className="text-lg text-red-900">Email:</Text>
            <TextInput
              className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="w-full mt-4 px-10">
            <Text className="text-lg text-red-900">Senha:</Text>
            <TextInput
              className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View className="w-full mt-4 px-10">
            <Text className="text-lg text-red-900">Repita a Senha:</Text>
            <TextInput
              className="h-[40px] mt-[5px] px-[10px] bg-[#D9D9D9] border-[1px] border-[#676767]"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        {/* Botões */}
        <View className="pt-12 items-center">
          <TouchableOpacity
            className="rounded-full flex-row justify-center items-center bg-red-800 px-6 py-3 w-54"
            onPress={handleRegister}
          >
            <Text className="text-white text-xl font-bold">CADASTRAR</Text>
            <View className="ml-2">
              <Icon name="arrow-right-long" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack} className="pt-4">
            <Text className="text-red-900 underline text-base">voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-[1.4] bg-red-900 justify-center items-"></View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#676767",
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
  },
});

export default RegisterPage;
