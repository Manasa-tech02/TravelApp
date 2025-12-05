import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPlaces, SortCategory } from '../../services/placesService';
import { Place } from '../../services/types';


interface FetchPlacesArgs {
  category: SortCategory;
  userLat?: number;     
  userLng?: number;    
  searchQuery?: string;
}


export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async (
    { category, userLat, userLng, searchQuery }: FetchPlacesArgs,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { places: PlacesState };
      const cachedItems = state.places.cache[category];

      if (!searchQuery && cachedItems.length > 0) {
        return { items: cachedItems, fromCache: true, category };
      }

      const places = await getPlaces(category, userLat, userLng, searchQuery);
      return { items: places, fromCache: false, category, searchQuery };
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
  activeCategory: SortCategory; 
  cache: Record<SortCategory, Place[]>; 

}

const initialState: PlacesState = {
  items: [],
  loading: false,
  error: null,
  activeCategory: 'most_viewed', 
  cache: {
    most_viewed: [],
    nearby: [],
    latest: [],
  },
};

// 4. The Slice
const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    
    setActiveCategory: (state, action: PayloadAction<SortCategory>) => {
      state.activeCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state, action) => {
      const comingFromCache = state.cache[action.meta.arg.category].length > 0 && !action.meta.arg.searchQuery;
      state.loading = !comingFromCache;
      state.error = null;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;

      if (!action.payload.fromCache && !action.payload.searchQuery) {
        state.cache[action.payload.category] = action.payload.items;
      }
    });
    builder.addCase(fetchPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});


export const { setActiveCategory } = placesSlice.actions;
export default placesSlice.reducer;