import api from "../../services/api";

export const loginUser = async (data: any) => {
  try {
    const response = await api.post(`/auth/login/`, data);
    await api.saveItem("token", JSON.stringify(response.data.data.acces_token));
    return response;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
