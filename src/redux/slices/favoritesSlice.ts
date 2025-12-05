import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// IMPORT the Place type from your MockData file to avoid redundancy
import { Place } from '../../services/types';

interface FavoritesState {
  items: Place[];
}

// Initial State: The favorites list is empty when the app starts
const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // The core function for the Heart icon
    toggleFavorite: (state, action: PayloadAction<Place>) => {
      const place = action.payload;
      
      
      const existingIndex = state.items.findIndex((item) => item.id === place.id);

      if (existingIndex >= 0) {
        
        state.items.splice(existingIndex, 1);
      } else {
        
        state.items.unshift(place);
      }
    },
    
    
    clearFavorites: (state) => {
      state.items = [];
    }
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;