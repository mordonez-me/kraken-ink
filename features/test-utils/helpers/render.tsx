import { render as rtlRender } from "@testing-library/react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
);

export * from "@testing-library/react-native";
export const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  rtlRender(ui, { wrapper: Providers, ...options });
