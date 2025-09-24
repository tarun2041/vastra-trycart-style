import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

export interface TryCartItem {
  product: Product;
  addedAt: string;
}

interface TryCartState {
  items: TryCartItem[];
  maxItems: number;
  securityAmount: number;
  isPaid: boolean;
}

const initialState: TryCartState = {
  items: [],
  maxItems: 5,
  securityAmount: 1000,
  isPaid: false,
};

const tryCartSlice = createSlice({
  name: 'tryCart',
  initialState,
  reducers: {
    addToTryCart: (state, action: PayloadAction<Product>) => {
      // Check if already in TryCart
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return; // Already in TryCart
      }
      
      // Check if TryCart is full
      if (state.items.length >= state.maxItems) {
        return; // TryCart is full
      }
      
      state.items.push({
        product: action.payload,
        addedAt: new Date().toISOString(),
      });
    },
    removeFromTryCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    clearTryCart: (state) => {
      state.items = [];
      state.isPaid = false;
    },
    paySecurityAmount: (state) => {
      state.isPaid = true;
    },
    moveToRegularCart: (state, action: PayloadAction<string[]>) => {
      // Remove selected items from TryCart (they'll be added to regular cart separately)
      state.items = state.items.filter(item => !action.payload.includes(item.product.id));
    },
  },
});

export const { 
  addToTryCart, 
  removeFromTryCart, 
  clearTryCart, 
  paySecurityAmount, 
  moveToRegularCart 
} = tryCartSlice.actions;
export default tryCartSlice.reducer;