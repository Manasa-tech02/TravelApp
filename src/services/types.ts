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
}

export interface ApiPlace {
  id: string;
  name: string;     
  location: string;
  rating: number;
  image: string;
  description: string;
  price: string;
}
