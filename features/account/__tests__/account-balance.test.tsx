import { render, screen } from "@testing-library/react-native";
import React from "react";
import { AccountBalance } from "../components/account-balance";

jest.mock("@/features/shared/wallet/hooks/use-wallet-connect", () => ({
  useWalletConnect: () => ({
    isConnected: true,
    address: "0x6AE70dCA72263A69aD73369c8d27B4dA334653BF",
  }),
}));

jest.mock("@/features/shared/wallet/hooks/use-wallet-tokens", () => ({
  useGetTokens: () => ({
    getNativeBalance: jest
      .fn()
      .mockResolvedValue(BigInt("1000000000000000000")), // 1 ETH
    getTokenBalance: jest.fn().mockResolvedValue(BigInt("5000000000000000000")), // 5 ASTRA
  }),
}));

describe("AccountBalance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the user's address", async () => {
    render(<AccountBalance />);

    expect(await screen.findByText("User address:")).toBeOnTheScreen();
    expect(
      await screen.findByText("0x6AE70dCA72263A69aD73369c8d27B4dA334653BF")
    ).toBeOnTheScreen();
  });

  it("loads and displays the balances correctly", async () => {
    render(<AccountBalance />);

    expect(await screen.findByText("Eth balance:")).toBeOnTheScreen();
    expect(await screen.findByText("Astra balance:")).toBeOnTheScreen();
    expect(await screen.findByText("1 ETH")).toBeOnTheScreen();
    expect(await screen.findByText("5 ASTRA")).toBeOnTheScreen();
  });
});
