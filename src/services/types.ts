export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Place {
  id: string;
  title: string;
  location: string;
  image: string; 
  description: string;
  price: number;
  rating: number;
  latitude: number;   
  longitude: number; 
  views: number;     
  createdAt: string;
  temperature?: number;
  duration?: string;
}

export interface ApiPlace {
  id: string;
  name: string;     
  location: string;
  rating: number;
  image: string;
  description: string;
  price: string;
  latitude: string;   // API usually sends coordinates as strings
  longitude: string;  // API usually sends coordinates as strings
  views: number;
  createdAt: string;
  temperature?: string;
  duration?: string;
}
