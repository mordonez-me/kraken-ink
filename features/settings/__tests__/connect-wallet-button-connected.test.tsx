import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import ConnectWalletButton from "../components/connect-wallet-button";

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock("@/features/shared/wallet/hooks/use-wallet-connect", () => ({
  useWalletConnect: () => ({
    isConnected: true,
    address: "0x6AE70dCA72263A69aD73369c8d27B4dA334653BF",
    connect: mockConnect,
    disconnect: mockDisconnect,
  }),
}));

jest.mock("@/features/shared/wallet/utils/shorten-address", () => ({
  shortenAddress: (address: string) =>
    address.slice(0, 6) + "..." + address.slice(-4),
}));

describe("ConnectWalletButton - Connected State", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the connected status", () => {
    render(<ConnectWalletButton />);
    expect(screen.getByText("Conectado")).toBeOnTheScreen();
  });

  it("shows the shortened address", () => {
    render(<ConnectWalletButton />);
    expect(screen.getByText("0x6AE7...53BF")).toBeOnTheScreen();
  });

  it("shows the disconnect button", () => {
    render(<ConnectWalletButton />);
    expect(screen.getByText("Desconectar")).toBeOnTheScreen();
  });

  it("calls disconnect when the disconnect button is pressed", () => {
    render(<ConnectWalletButton />);
    fireEvent.press(screen.getByText("Desconectar"));
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
