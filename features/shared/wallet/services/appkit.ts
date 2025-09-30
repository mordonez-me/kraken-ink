import "@walletconnect/react-native-compat";

import {
  createAppKit,
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";
import { inkSepolia } from "@reown/appkit/networks";
import { http } from "viem";

const projectId = process.env.EXPO_PUBLIC_WC_PROJECT_ID!;

const metadata = {
  name: "kraken-ink-wallet",
  description: "Kraken Ink Wallet",
  url: "https://krakeninkwallet.mordonez.me",
  icons: [
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Walletconnect-logo.png?20221128041755",
  ],
  redirect: {
    native: "krakeninkwallet://",
    universal: "https://krakeninkwallet.mordonez.me",
  },
};

export const wagmiConfig = defaultWagmiConfig({
  chains: [inkSepolia],
  projectId,
  metadata,
  transports: [http(inkSepolia.rpcUrls.default.http[0])],
});

createAppKit({
  projectId,
  wagmiConfig,
  enableAnalytics: false,
  defaultChain: inkSepolia,
  metadata,
  debug: true,
});
