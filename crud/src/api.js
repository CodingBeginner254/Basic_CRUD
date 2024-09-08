// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // 서버의 URL을 설정하세요

export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API_URL}/items`, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/items/${id}`);
};

export const LoginItem = async(idpassword) =>{
  const response = await axios.post(`${API_URL}/login`,idpassword,{withCredentials:true});
  return response.data;
}

export const SigninItem = async(idpassword) =>{
  const response = await axios.post(`${API_URL}/signin`,idpassword);
  return response.data;
}
export const ProfileItem = async () => {
  const response = await axios.get(`${API_URL}/profile`,{ withCredentials: true });
  return response.data;
}

export const RefreshAccessToken = async () => {
  const response = await axios.post(`${API_URL}/token`,{},{withCredentials: true});
  return response.data;
}
