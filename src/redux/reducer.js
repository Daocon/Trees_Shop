import { createReducer } from "@reduxjs/toolkit";
import { addItem, removeItem, clearCart, SAVE_CART_ITEMS, SAVE_TOTAL_AMOUNT } from "./action";

const initialState = { items: [], totalAmount: 0, };

const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addItem, (state, action) => {
            const existingItem = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItem !== -1) {
                state.items[existingItem].quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        })
        .addCase(removeItem, (state, action) => {
            const existingItem = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItem !== -1) {
                state.items[existingItem].quantity--;
            }
            if (state.items[existingItem].quantity === 0) {
                state.items.splice(existingItem, 1);
            }
        })
        .addCase(clearCart, (state) => {
            state.items = [];
        })
        .addCase(SAVE_CART_ITEMS, (state, action) => {
            state.items = action.payload;
        })
        .addCase(SAVE_TOTAL_AMOUNT, (state, action) => {
            state.totalAmount = action.payload;
        });
});

export default cartReducer;
