import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../types/Cart';
import { CartState } from '../types/ReduxState';

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Cart>) {
            const existingProduct = state.items.find(item => item.product.id === action.payload.product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const existingProduct = state.items.find(item => item.product.id === action.payload);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.product.id !== action.payload);
                }
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;