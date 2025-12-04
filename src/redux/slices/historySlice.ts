import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryItem {
  id: string;
  title: string;
  location: string;
}

interface HistoryState {
  items: HistoryItem[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryItem>) => {
      if (!state.items) state.items = [];
      const newItem = action.payload;
      // Prevent duplicates: Remove if exists (by ID), then add to top
      state.items = state.items.filter(item => item.id !== newItem.id);
      state.items.unshift(newItem);
      
      // Limit history to 20 items
      if (state.items.length > 20) state.items.pop();
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      if (!state.items) return;
      // Remove by ID
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearHistory: (state) => {
      state.items = [];
    }
  },
});

export const { addToHistory, removeFromHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;