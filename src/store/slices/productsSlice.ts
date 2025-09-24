import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  selectedCategory: string | null;
  priceRange: { min: number; max: number };
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'newest';
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: ['Men', 'Women', 'Kids', 'Accessories'],
  loading: false,
  selectedCategory: null,
  priceRange: { min: 0, max: 10000 },
  sortBy: 'popularity',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.filteredProducts = state.products.filter(product => 
          product.category === action.payload
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
    filterByPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
      state.filteredProducts = state.products.filter(product => 
        product.price >= action.payload.min && product.price <= action.payload.max
      );
    },
    sortProducts: (state, action: PayloadAction<'popularity' | 'price-low' | 'price-high' | 'newest'>) => {
      state.sortBy = action.payload;
      
      switch (action.payload) {
        case 'price-low':
          state.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          state.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          state.filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'popularity':
        default:
          state.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    },
  },
});

export const { 
  setProducts, 
  setLoading, 
  filterByCategory, 
  filterByPriceRange, 
  sortProducts 
} = productsSlice.actions;
export default productsSlice.reducer;