import api from "../../services/api";

export const loginUser = async (data: any) => {
  try {
    const response = await api.get(`/users/checkPassword/${data.password}`);
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
