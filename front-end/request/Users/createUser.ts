import api from "../../services/api";

export const registerUser = async (data: any) => {
  try {
    //Verify if user already exists first
    const userExists = await api.get(`/users/exists/${data.login}`);
    if(userExists){
      return userExists.data;
    }else{

      const response = await api.post("/users/register", data);
      return response.data;
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
