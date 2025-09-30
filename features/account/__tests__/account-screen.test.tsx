import { render, screen } from "@testing-library/react-native";
import React from "react";
import { AccountScreen } from "../screens/account-screen";

describe("AccountScreen", () => {
  it("renders the header with correct title", async () => {
    const { unmount } = render(<AccountScreen />);
    expect(await screen.findByText("Account")).toBeOnTheScreen();
    unmount();
  });
});
