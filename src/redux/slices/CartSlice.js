import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  subtotal: 0,
  discount: 0,
  grandTotal: 0,
  customer: {}
};

const calculateSubtotal = (items) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return parseFloat(subtotal.toFixed(2)); 
};
const calculateGrandTotal = (subtotal, discountPercentage) => {
  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;
  return parseFloat(total.toFixed(2));
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additems: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = parseFloat(
          (existingItem.price * existingItem.quantity).toFixed(2)
        );
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total: parseFloat(Number(action.payload.price).toFixed(2)),
        });
      }
      state.subtotal = calculateSubtotal(state.items);
      state.grandTotal = calculateGrandTotal(state.subtotal, state.discount);
    },
    removeItems: (state, action) => {
      const itemIndex = state.items.findIndex(
        (product) => product._id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
      state.subtotal = calculateSubtotal(state.items);
      state.grandTotal = calculateGrandTotal(state.subtotal, state.discount);
    },
    applyDiscountValue: (state, action) => {
      state.discount = action.payload;
      state.grandTotal = calculateGrandTotal(state.subtotal, state.discount);
    },
    addCustomerDetails: (state, action) => {
      state.customer = action.payload;
     
    },
    clearCart: (state, action) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.grandTotal = 0;
      state.customer = {};
     
    },
  },
});
export const { additems, removeItems, applyDiscountValue,addCustomerDetails,clearCart } = CartSlice.actions;
export default CartSlice.reducer;
