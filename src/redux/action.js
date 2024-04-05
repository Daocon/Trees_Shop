import { createAction } from "@reduxjs/toolkit";
export const SAVE_CART_ITEMS = 'SAVE_CART_ITEMS';
export const SAVE_TOTAL_AMOUNT = 'SAVE_TOTAL_AMOUNT';

export const addItem = createAction("cart/addItem");
export const removeItem = createAction("cart/removeItem");
export const clearCart = createAction('cart/clear');


export const saveCartItems = (items) => ({
    type: SAVE_CART_ITEMS,
    payload: items,
});

export const saveTotalAmount = (amount) => ({
    type: SAVE_TOTAL_AMOUNT,
    payload: amount,
});