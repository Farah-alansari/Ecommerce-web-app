jest.mock("../firebase", () => ({
  auth: {},
  db: {},
}));
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../store/cartSlice";
import Cart from "./Cart";

function renderWithStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );

  return { store };
}

test("updates cart when product is added", async () => {
  const { store } = renderWithStore();

  const product = {
    id: "1",
    title: "Test Product",
    price: 100,
    description: "Test description",
  };

  store.dispatch(addToCart(product));

  expect(await screen.findByText(/test product/i)).toBeInTheDocument();
});
