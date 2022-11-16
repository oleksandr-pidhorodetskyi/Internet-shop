import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let chanched = false;
      const { _id, quantity, price, color, size } = action.payload; 
      state.products.map(item=>{
        if(item._id === _id && item.color === color && item.size === size){
          item.quantity += quantity;
          item.price += price;
          chanched = true
        }
      })
      if(chanched === false){
        state.quantity += 1;
        state.products.push(action.payload);

      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      if( state.quantity > 0){
        state.quantity -= 1
      }
      state.total -= action.payload.price * action.payload.quantity;
      const { _id, color, size } = action.payload; 
      state.products = state.products.filter(item => item._id !== _id || item.color !== color || item.size !== size )
    },
    deleteProducts: (state) => {
      state.products.length = 0;
      state.total = 0;
      state.quantity = 0;
    }
  },
});

export const { addProduct, deleteProduct, deleteProducts } = cartSlice.actions;
export default cartSlice.reducer;
