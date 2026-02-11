jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
  signOut: jest.fn(),
}));

jest.mock("../firebase", () => ({
  auth: {},
}));
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
// import { onAuthStateChanged, signOut } from "firebase/auth";

describe("Navbar component", () => {
  test("renders Home and Cart links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
