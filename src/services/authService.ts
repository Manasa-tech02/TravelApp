import { API_URL } from './config';
import { User } from './types';


export const registerUser = async (name: string, email: string, password: string) => {
  // First, check if email already exists
  const checkRes = await fetch(`${API_URL}/users?email=${email}`);
  const existingUsers = await checkRes.json();

  if (existingUsers.length > 0) {
    throw new Error("User already exists with this email!");
  }

  // If unique, create the user
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      name, 
      email, 
      password, 
      avatar: "https://www.imagine.art/ai-image-generator"
    }),
  });

  if (!response.ok) throw new Error("Failed to sign up");
  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  const users: User[] = await response.json();

  const user = users.find((u) => u.password === password);

  if (user) {
   
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};