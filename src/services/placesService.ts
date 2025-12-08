import axios from 'axios';
import { getDistance } from 'geolib'; 
import { API_URL } from './config';
import { Place, ApiPlace } from './types';

// Define the categories for the tabs
export type SortCategory = 'most_viewed' | 'nearby' | 'latest';

export const getPlaces = async (
  category: SortCategory = 'most_viewed', 
  userLat?: number, 
  userLng?: number,
  searchQuery?: string 
): Promise<Place[]> => {
  
  let url = `${API_URL}/places`;

 
  
  const params: Record<string, string> = {};

  // Handle Search
  if (searchQuery) {
    params.search = searchQuery;
  }

  // Apply category-specific sorting rules before hitting the API
  if (category === 'most_viewed') {
    params.sortBy = 'views';       // Highest view counts first
    params.order = 'desc';
  } else if (category === 'latest') {
    params.sortBy = 'createdAt';   // Newest items first
    params.order = 'desc';
  }

  try {
    // --- 2. FETCH DATA ---
    const response = await axios.get<ApiPlace[]>(url, { params });
    let data = response.data;


    if (category === 'nearby' && userLat && userLng) {
      data = data.sort((a, b) => {
        const distA = getDistance(
          { latitude: userLat, longitude: userLng },
          { latitude: parseFloat(a.latitude), longitude: parseFloat(a.longitude) }
        );
        const distB = getDistance(
          { latitude: userLat, longitude: userLng },
          { latitude: parseFloat(b.latitude), longitude: parseFloat(b.longitude) }
        );
        return distA - distB; 
      });
    }


    return data.map(item => ({
      id: item.id,
      title: item.name,       
      location: item.location,
      image: item.image,    
      rating: item.rating,
      description: item.description, 
      price: parseFloat(item.price),
      
    
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      views: item.views || 0,
      createdAt: item.createdAt
    }));

  } catch (error: any) {
   
    if (axios.isAxiosError(error)) {
      
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(error.response?.data || error.message);
    }
    throw new Error("Failed to fetch places: " + error.message);
  }
};