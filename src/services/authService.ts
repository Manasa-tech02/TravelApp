
import axios from 'axios';
import { API_URL } from './config';
import { User } from './types';

const getErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return typeof error.response.data === 'string' ? error.response.data : error.response.statusText;
    }
  }
  return error.message || "Something went wrong";
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    // 1. Check if user exists
    const checkRes = await axios.get(`${API_URL}/users?email=${email}`);
    
    if (checkRes.data.length > 0) {
      throw new Error("User already exists with this email!");
    }

    // 2. Create User
    const response = await axios.post(`${API_URL}/users`, { 
      name, email, password, avatar: "default" 
    });

    return response.data;

  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users?email=${email}`);
    const users = response.data;

    const user = users.find((u) => u.password === password);

    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};