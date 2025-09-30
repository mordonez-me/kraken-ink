import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { wagmiConfig } from "@/features/shared/wallet/services/appkit";
import { AppKit } from "@reown/appkit-wagmi-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider value={DarkTheme}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <KeyboardProvider>{children}</KeyboardProvider>
          </SafeAreaProvider>
          <AppKit />
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
