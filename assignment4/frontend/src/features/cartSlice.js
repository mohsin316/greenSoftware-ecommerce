import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const storage = localStorage.getItem("cart");
const cartAdapter = createEntityAdapter();
const initialState = cartAdapter.getInitialState(JSON.parse(storage));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const cartQuantity = state.entities[action.payload.id]
          ? state.entities[action.payload.id].quantity
          : 0;
        cartAdapter.setOne(state, {
          ...action.payload,
          quantity: cartQuantity + action.payload.quantity,
        });
        localStorage.setItem("cart", JSON.stringify(state));
      },
      prepare(id, name, quantity, price, imageURL) {
        return {
          payload: { id, name, quantity, price, imageURL },
        };
      },
    },
    removeFromCart: (state, action) => {
      if (state.entities[action.payload.id].quantity <= 1) {
        cartAdapter.removeOne(state, action.payload.id);
      } else {
        cartAdapter.upsertOne(state, {
          id: action.payload.id,
          quantity: state.entities[action.payload.id].quantity - 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    emptyCart: (state) => {
      cartAdapter.removeAll(state);
      localStorage.clear();
    },
  },
});

export const { selectAll, selectIds, selectEntities } =
  cartAdapter.getSelectors((state) => state.cart);

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
