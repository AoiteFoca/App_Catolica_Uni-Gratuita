import api from "../../services/api";

export const registerUser = async (data: any) => {
  try {
    //Verify if user already exists first
    const userExists = await api.get(`/users/exists/${data.login}`);
    if(userExists.request.status === 409){
      return userExists.request._response;
    }else{

      const datas = {login: data.email, password: data.password, userTypeId: data.userTypeId};
      const response = await api.post("/users/register", datas);
      if (response.status === 200) {
        return response.data;
      }else{
        return response.data;
      }
    }
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};