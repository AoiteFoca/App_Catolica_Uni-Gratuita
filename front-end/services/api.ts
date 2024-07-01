import axios from "axios";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

const baseURL =
  Platform.OS === "android"
    ? "http://192.168.5.101:3000/"
    : "http://192.168.5.101:3000/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    return Promise.reject(error);
  }
);

export default api;
