import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import ConnectCta from "../components/connect-cta";

describe("ConnectCta", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the message to connect the wallet", () => {
    render(<ConnectCta />);
    expect(
      screen.getByText(
        "Connect your wallet in the settings tab to see your balance"
      )
    ).toBeOnTheScreen();
  });

  it("shows the button to go to settings", () => {
    render(<ConnectCta />);
    expect(screen.getByText("Go to settings")).toBeOnTheScreen();
  });

  it("navigates to settings when the button is pressed", () => {
    render(<ConnectCta />);
    fireEvent.press(screen.getByText("Go to settings"));

    expect(router.push).toHaveBeenCalledWith("/(tabs)/settings");
  });
});
