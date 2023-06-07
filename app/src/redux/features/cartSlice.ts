import { createSlice } from "@reduxjs/toolkit";
import Toast from 'react-native-root-toast'

type ProductType = { title: string, quantity: number, price: number, cover_img: string, slug: string }

const initialState: {
  products: ProductType[],
  quantity: number,
  subTotal: number
} = {
  products: [],
  quantity: 0,
  subTotal: 0.0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newCart = {
        products: [
          ...state.products,
          action.payload,
        ],
        quantity:
          action.payload.quantity +
          state.quantity,
        subTotal: (
          Number(state.subTotal) +
          Number(
            action.payload.quantity *
            action.payload.price
          )
        ).toFixed(2),
      }
      state.products = newCart.products;
      state.quantity = newCart.quantity;
      state.subTotal = Number(newCart.subTotal);
      Toast.show(`${action.payload.title} added to cart!`, {
        duration: Toast.durations.SHORT,
        position: 60,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'green',
        textColor: '#fff'
      });
    },
    increaseQty: (state, action) => {

      const product = state.products.find((product) => {
        return product.slug == action.payload.slug;
      });

      if (product) {
        const productIndex = state.products.findIndex(
          (product: ProductType) => {
            return product.slug == action.payload.slug;
          }
        );
        const formerQty = product.quantity
        let productsArr = [...state.products];
        productsArr[productIndex].quantity = formerQty + 1

        const newCart = {
          products: productsArr,
          quantity:
            state.quantity + 1,
          subTotal: (
            Number(state.subTotal) + Number(product.price)
          ).toFixed(2),
        };
        state.products = newCart.products;
        state.quantity = newCart.quantity;
        state.subTotal = Number(newCart.subTotal);
      }
    },
    decreaseQty: (state, action) => {
      const product = state.products.find((product) => {
        return product.slug == action.payload.slug;
      });

      if (product) {
        const productIndex = state.products.findIndex(
          (product: ProductType) => {
            return product.slug == action.payload.slug;
          }
        );
        const formerQty = product.quantity
        let productsArr = [...state.products];
        productsArr[productIndex].quantity = formerQty - 1

        const newCart = {
          products: productsArr,
          quantity:
            state.quantity - 1,
          subTotal: (
            Number(state.subTotal) - Number(product.price)
          ).toFixed(2),
        };
        state.products = newCart.products;
        state.quantity = newCart.quantity;
        state.subTotal = Number(newCart.subTotal);
      }
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find((product: ProductType) => {
        return product.slug == action.payload.slug;
      });

      const productToRemoveIndex = state.products.findIndex(
        (product: ProductType) => {
          return product.slug == action.payload.slug;
        }
      );
      let productsArr = [...state.products];
      productsArr.splice(productToRemoveIndex, 1);

      const newCart = {
        products: productsArr,
        quantity: state.quantity - productToRemove.quantity,
        subTotal: (
          Number(state.subTotal) -
          Number(productToRemove.quantity * productToRemove.price)
        ).toFixed(2),
      };
      state.products = newCart.products;
      state.quantity = newCart.quantity;
      state.subTotal = Number(newCart.subTotal);

      Toast.show(`${productToRemove.title} removed from cart!`, {
        duration: Toast.durations.SHORT,
        position: 60,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red',
        textColor: '#fff'
      });
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.subTotal = 0.0;
    },
  },
});

export const { addProduct, increaseQty, decreaseQty, removeProduct, clearCart } =
  cart.actions
export default cart.reducer;