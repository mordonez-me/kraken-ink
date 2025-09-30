import { renderWithProviders } from "@/features/test-utils/helpers/render";
import { screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { SettingsScreen } from "../screens/settings-screen";

describe("SettingsScreen", () => {
  it("renders the header with correct title", async () => {
    renderWithProviders(<SettingsScreen />);
    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeOnTheScreen();
    });
  });

  it("renders the connect wallet button", async () => {
    renderWithProviders(<SettingsScreen />);
    await waitFor(() => {
      expect(screen.getByText("Conectado")).toBeOnTheScreen();
    });
  });

  it("renders all components in the correct structure", async () => {
    renderWithProviders(<SettingsScreen />);
    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeOnTheScreen();
      expect(screen.getByText("Conectado")).toBeOnTheScreen();
      expect(screen.getByText("Desconectar")).toBeOnTheScreen();
    });
  });
});
