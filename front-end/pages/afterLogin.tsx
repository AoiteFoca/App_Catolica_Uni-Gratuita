import { Text, View } from "react-native";
import Layout from "../components/layout";

const AfterLogin = () => {
  return (
    <Layout currentTab="AfterLogin">
      <View className="bg-red-900 w-full h-full flex-1 flex-col justify-center">
        <View className="justify-center items-center mt-20">
          <Text className="text-[28px] text-white font-bold text-center">
            Bem vindo(a)!
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl text-white text-center mt-2">
            Essa é a sua tela principal.
          </Text>
        </View>
        <View className="items-center mt-8">
          <Text className="text-2xl text-white text-center w-[70%]">
            Use os botões da barra de menu abaixo para navegar pelo aplicativo.
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default AfterLogin;
