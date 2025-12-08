import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortCategory } from '../../services/placesApi';

interface PlacesState {
  activeCategory: SortCategory;
}

const initialState: PlacesState = {
  activeCategory: 'most_viewed',
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<SortCategory>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = placesSlice.actions;
export default placesSlice.reducer;
