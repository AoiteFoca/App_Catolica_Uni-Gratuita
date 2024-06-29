import api from "../../services/api";

export const registerUser = async (data: any) => {
  try {
    const response = await api.post("/users/register", data); // Substitua pelo endpoint desejado
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
