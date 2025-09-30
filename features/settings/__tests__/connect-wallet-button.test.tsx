import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import ConnectWalletButton from "../components/connect-wallet-button";

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock("@/features/shared/wallet/hooks/use-wallet-connect", () => ({
  useWalletConnect: () => ({
    isConnected: false,
    address: null,
    connect: mockConnect,
    disconnect: mockDisconnect,
  }),
}));

describe("ConnectWalletButton - Disconnected State", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the connect message", () => {
    render(<ConnectWalletButton />);
    expect(
      screen.getByText("Tap the button to connect your wallet")
    ).toBeOnTheScreen();
  });

  it("shows the connect button", () => {
    render(<ConnectWalletButton />);
    expect(screen.getByText("Connect Wallet")).toBeOnTheScreen();
  });

  it("calls connect when the button is pressed", () => {
    render(<ConnectWalletButton />);
    fireEvent.press(screen.getByText("Connect Wallet"));
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });
});
