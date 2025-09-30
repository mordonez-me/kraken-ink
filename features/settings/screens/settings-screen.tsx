import { Header } from "@/features/shared/ui/header/components/header";
import { SafeAreaView } from "@/features/shared/ui/safe-area/components/safe-area-view";
import ConnectWalletButton from "../components/connect-wallet-button";

export const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Settings" />
      <ConnectWalletButton />
    </SafeAreaView>
  );
};
