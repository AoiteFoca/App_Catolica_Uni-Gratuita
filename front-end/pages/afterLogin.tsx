import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Layout from "../components/layout";

const AfterLogin = () => {
  const buttons = [
    {
      label: "ENVIAR DOCUMENTAÇÃO",
    },
    {
      label: "CHECAR ANDAMENTO DA SOLICITAÇÃO",
    },
  ];

  return (
    <Layout currentTab="Menu">
      <View className="bg-red-900 w-full h-full flex-1 flex-col">
        <View className="flex-1 justify-center items-center mt-20">
          <Text className="text-2xl text-white font-bold text-center w-[50%]">
            Escolha o que quer acessar
          </Text>
        </View>
        <View className="flex-1 items-center flex-col gap-10">
          {buttons.map((res) => (
            <TouchableOpacity className="rounded flex-row justify-around items-center bg-red-900 w-72 border-[1.2px] border-white">
              <Text className="text-xl text-white mt-3 mb-3 font">
                {res.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-400 underline">voltar</Text>
        </View>
      </View>
    </Layout>
  );
};

export default AfterLogin;
