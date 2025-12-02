import axios from 'axios';
import { API_URL } from './config';
import { Place, ApiPlace } from './types';

export const getPlaces = async (searchQuery?: string): Promise<Place[]> => {
  let url = `${API_URL}/places`;
  
  if (searchQuery) {
    url += `?search=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const response = await axios.get<ApiPlace[]>(url);
    const data = response.data;
    
    return data.map(item => ({
      id: item.id,
      title: item.name,       
      location: item.location,
      image: item.image,    
      rating: item.rating,
      description: item.description, 
      price: parseFloat(item.price),
    }));
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw new Error("Failed to fetch places");
  }
};
