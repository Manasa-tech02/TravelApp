import axios from 'axios';
import { API_URL } from './config';
import { User } from './types';


export const registerUser = async (name: string, email: string, password: string) => {
  // First, check if email already exists
  const checkRes = await axios.get(`${API_URL}/users?email=${email}`);
  const existingUsers = checkRes.data;

  if (existingUsers.length > 0) {
    throw new Error("User already exists with this email!");
  }

  // If unique, create the user
  const response = await axios.post(`${API_URL}/users`, { 
    name, 
    email, 
    password,
    avatar: "default",
  });

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.get<User[]>(`${API_URL}/users?email=${email}`);
  const users = response.data;

  const user = users.find((u) => u.password === password);

  if (user) {
   
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};