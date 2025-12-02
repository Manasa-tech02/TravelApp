import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaces } from '../../services/placesService';
import { Place } from '../../services/types';

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      const places = await getPlaces(query);
      return places;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface PlacesState {
  items: Place[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  items: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
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

export default placesSlice.reducer;
