import { API_URL } from './config';
import { Place, ApiPlace } from './types';

export const getPlaces = async (searchQuery?: string): Promise<Place[]> => {
  let url = `${API_URL}/places`;
  

  if (searchQuery) {
    url += `?search=${encodeURIComponent(searchQuery)}`;
  }

  const response = await fetch(url);
  

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) throw new Error("Failed to fetch places");
  
  const data: ApiPlace[] = await response.json();
  
  
  return data.map(item => ({
    id: item.id,
    title: item.name,       
    location: item.location,
    image: item.image,    
    rating: item.rating,
   
    description: item.description, 
  
    price: parseFloat(item.price),
  }));
};
