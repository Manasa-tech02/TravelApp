import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPlaces, SortCategory } from '../../services/placesService';
import { Place } from '../../services/types';


interface FetchPlacesArgs {
  category: SortCategory;
  userLat?: number;     
  userLng?: number;    
  searchQuery?: string;
}

// 2. The Thunk (Async Action)
export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  // We accept the object defined above
  async ({ category, userLat, userLng, searchQuery }: FetchPlacesArgs, { rejectWithValue }) => {
    try {
      // Call the updated Service logic
      const places = await getPlaces(category, userLat, userLng, searchQuery);
      return places;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. The State Structure
interface PlacesState {
  items: Place[];
  loading: boolean;
  error: string | null;
  activeCategory: SortCategory; // Track the active tab
}

const initialState: PlacesState = {
  items: [],
  loading: false,
  error: null,
  activeCategory: 'most_viewed', // Default startup tab
};

// 4. The Slice
const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    // Action to manually switch the active tab in Redux
    setActiveCategory: (state, action: PayloadAction<SortCategory>) => {
      state.activeCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export the action so we can use it in HomeScreen
export const { setActiveCategory } = placesSlice.actions;
export default placesSlice.reducer;