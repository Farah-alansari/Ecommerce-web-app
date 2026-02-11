jest.mock("../firebase", () => ({
  db: {},
}));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve()),
  Timestamp: {
    now: jest.fn(),
  },
}));

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import Cart from "./Cart";

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Cart component", () => {
  test("shows empty cart message when no items", () => {
    renderWithStore(<Cart />);

    expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
  });
});
