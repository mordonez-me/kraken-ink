import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("@reown/appkit-wagmi-react-native", () => ({
  __esModule: true,
  defaultWagmiConfig: jest.fn(() => ({})),
  createAppKit: jest.fn(() => ({ open: jest.fn(), close: jest.fn() })),
  useAppKit: () => ({ open: jest.fn(), close: jest.fn() }),
  AppKitProvider: ({ children }) => <>{children}</>,
}));

jest.mock("@/features/shared/wallet/utils/shorten-address", () => ({
  shortenAddress: (address) => address.slice(0, 6) + "..." + address.slice(-4),
}));

jest.mock("@/features/shared/logger/hooks/use-logger", () => ({
  useLogger: () => ({ log: jest.fn(), error: jest.fn() }),
}));

jest.mock("@walletconnect/react-native-compat", () => ({}));

jest.mock("@reown/appkit-wagmi-react-native", () => {
  const React = require("react");
  return {
    __esModule: true,
    defaultWagmiConfig: jest.fn(() => ({})),
    createAppKit: jest.fn(() => ({ open: jest.fn(), close: jest.fn() })),
    AppKitProvider: ({ children }) => <>{children}</>,
    useAppKit: () => ({ open: jest.fn(), close: jest.fn() }),
  };
});

jest.mock("wagmi", () => {
  const React = require("react");
  return {
    __esModule: true,
    WagmiConfig: ({ children }) => <>{children}</>,
    useAccount: () => ({ address: "0x0000", isConnected: true }),
    useDisconnect: () => ({ disconnect: jest.fn() }),
    createConfig: jest.fn(() => ({})),
  };
});

jest.mock("@react-navigation/native", () => {
  const React = require("react");
  return {
    __esModule: true,
    ThemeProvider: ({ children }) => <>{children}</>,
    NavigationContainer: ({ children }) => <>{children}</>,
    DarkTheme: {},
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
    useRoute: () => ({ params: {} }),
  };
});

jest.mock("react-native-keyboard-controller", () => {
  const React = require("react");
  return {
    KeyboardProvider: ({ children }) => <>{children}</>,
  };
});

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    SafeAreaProvider: ({ children }) => <>{children}</>,
    SafeAreaView: ({ children }) => <>{children}</>,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 390, height: 844 },
      insets: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  };
});

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  setParams: jest.fn(),
};

jest.mock("expo-router", () => ({
  useRouter: () => mockRouter,
  router: mockRouter,
}));
