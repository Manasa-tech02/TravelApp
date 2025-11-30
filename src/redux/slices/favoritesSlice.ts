import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// IMPORT the Place type from your MockData file to avoid redundancy
import { Place } from '../../constants/MockData';

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
      
      // Check if the place already exists in the array
      const existingIndex = state.items.findIndex((item) => item.id === place.id);

      if (existingIndex >= 0) {
        // If found, remove it (un-favorite)
        state.items.splice(existingIndex, 1);
      } else {
        // If not found, add it to the list (favorite)
        state.items.push(place);
      }
    },
    
    // Optional: Action to clear all favorites
    clearFavorites: (state) => {
      state.items = [];
    }
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;