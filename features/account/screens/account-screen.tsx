import { Header } from "@/features/shared/ui/header/components/header";
import { SafeAreaView } from "@/features/shared/ui/safe-area/components/safe-area-view";
import { useWalletConnect } from "@/features/shared/wallet/hooks/use-wallet-connect";
import { AccountBalance } from "../components/account-balance";
import ConnectCta from "../components/connect-cta";

export const AccountScreen = () => {
  const { isConnected } = useWalletConnect();

  return (
    <SafeAreaView>
      <Header title="Account" />
      {isConnected ? <AccountBalance /> : <ConnectCta />}
    </SafeAreaView>
  );
};
