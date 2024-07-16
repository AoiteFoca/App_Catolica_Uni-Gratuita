import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL =
  Platform.OS === "android"
    ? "http://10.197.10.235:3000/"
    : "http://10.197.10.235:3000/";

    interface CustomAxiosInstance extends AxiosInstance {
      saveItem: (key: string, value: string) => Promise<void>;
      getItem: (key: string) => Promise<any>;
    }
    
const api: CustomAxiosInstance = axios.create({
  baseURL: baseURL,
}) as CustomAxiosInstance;

api.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: response.data.message || "Operação bem-sucedida!",
      });
    }
    return response;
  },
  (error) => {
    Toast.show({
      type: "error",
      text1: "Erro",
      text2: error.response?.data?.message || "Algo deu errado!",
    });
    return error;
  }
);

//#region Cache
api.saveItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Erro ao salvar dados!", error);
  }
};

api.getItem = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key) as string;
    const parsedValue = await JSON.parse(value);
    return parsedValue;
  } catch (error) {
    console.error("Erro ao pegar os dados!", error);
    return null;
  }
};
//#endregion

export default api;