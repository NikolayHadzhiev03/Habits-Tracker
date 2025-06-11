
import request from "../utils/request";

const BASE_URL = "http://localhost:5000/api/users";

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    return request.post(`${BASE_URL}/login`, { email, password });
  };

  return {
    login,
  };
};


export const useRegister = () => {
  const register = async (username:string,email:string,password:string ,repassword:string) =>{
    return request.post(`${BASE_URL}/register`,{username,email,password,repassword})
  }


  return {
    register ,

  } 
}