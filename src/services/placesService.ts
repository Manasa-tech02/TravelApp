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

  // Handle Server-Side Sorting (Views & Latest)
  if (category === 'most_viewed') {
    params.sortBy = 'views';
    params.order = 'desc'; 
  } else if (category === 'latest') {
    params.sortBy = 'createdAt';
    params.order = 'desc';
  }

  try {
    // --- 2. FETCH DATA ---
    const response = await axios.get<ApiPlace[]>(url, { params });
    let data = response.data;

    // --- 3. CLIENT-SIDE SORTING (NEARBY) ---
    // MockAPI cannot calculate distance, so we fetch the list and sort it here.
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

    // --- 4. MAP TO UI TYPES ---
    return data.map(item => ({
      id: item.id,
      title: item.name,       
      location: item.location,
      image: item.image,    
      rating: item.rating,
      description: item.description, 
      price: parseFloat(item.price),
      
      // Map the new fields we added to types.ts
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      views: item.views || 0,
      createdAt: item.createdAt
    }));

  } catch (error: any) {
    // --- 5. ERROR HANDLING ---
    if (axios.isAxiosError(error)) {
      // If searching returns nothing (404), return empty array instead of crashing
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(error.response?.data || error.message);
    }
    throw new Error("Failed to fetch places: " + error.message);
  }
};