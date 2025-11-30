import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  searches: string[];
}

const initialState: HistoryState = {
  searches: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload;
      // Prevent duplicates: Remove if exists, then add to top
      state.searches = state.searches.filter(t => t !== term);
      state.searches.unshift(term); // Add to beginning
      
      // Optional: Limit history to 10 items
      if (state.searches.length > 10) state.searches.pop();
    },
    removeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searches = state.searches.filter(t => t !== action.payload);
    },
    clearHistory: (state) => {
      state.searches = [];
    }
  },
});

export const { addSearchTerm, removeSearchTerm, clearHistory } = historySlice.actions;
export default historySlice.reducer;