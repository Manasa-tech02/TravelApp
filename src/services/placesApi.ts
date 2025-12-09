import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDistance } from 'geolib';
import { API_URL } from './config';
import { Place, ApiPlace } from './types';

export type SortCategory = 'most_viewed' | 'nearby' | 'latest';

interface GetPlacesArgs {
  category: SortCategory;
  userLat?: number;
  userLng?: number;
  searchQuery?: string;
}

export const placesApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPlaces: builder.query<Place[], GetPlacesArgs>({
      query: ({ category, searchQuery }) => {
        const params: Record<string, string> = {};

        if (searchQuery) {
          params.search = searchQuery;
        }

        if (category === 'most_viewed') {
          params.sortBy = 'views';
          params.order = 'desc';
        } else if (category === 'latest') {
          params.sortBy = 'createdAt';
          params.order = 'desc';
        }

        return {
          url: 'places',
          params,
        };
      },
      transformResponse: (response: ApiPlace[], meta, arg) => {
        let data = response;
        const { category, userLat, userLng } = arg;

        // Client-side sorting for 'nearby'
        if (category === 'nearby' && userLat && userLng) {
          data = [...data].sort((a, b) => {
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

        // Map to Place type
        return data.map((item) => ({
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
          createdAt: item.createdAt,
        }));
      },
    }),
  }),
});

export const { useGetPlacesQuery } = placesApi;
