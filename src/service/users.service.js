import axios from "axios";
// import { COOKIE_KEY } from '../constants'
import { getToken } from "./common";
const API_URL = "https://todolist-api.hexschool.io/users";

const signUp = params => {
  return axios.post(`${API_URL}/sign_up`, { ...params });
};
const signIn = params => {
  return axios.post(`${API_URL}/sign_in`, { ...params });
};
const checkout = () => {
  const token = getToken();
  
  return axios.get(`${API_URL}/checkout`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
};

const signOut = () => {
  const token = getToken();
  return axios.post(`${API_URL}/sign_out`,{}, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
};

const UsersService = {
  signUp,
  signIn,
  checkout,
  signOut
};
export default UsersService;