import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { createPublicClient, http } from "viem";
import { inkSepolia } from "viem/chains";
import { useAccount, useDisconnect } from "wagmi";

export function useWalletConnect() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { open, close } = useAppKit();

  const publicClient = createPublicClient({
    chain: inkSepolia,
    transport: http(inkSepolia.rpcUrls.default.http[0]),
  });

  async function getBalance() {
    if (!address) throw new Error("Not connected");
    const balance = await publicClient.getBalance({ address });
    return balance;
  }

  const connectWallet = () => open();
  const disconnectWallet = () => disconnect();

  return {
    isConnected,
    address,
    chainId,
    connect: connectWallet,
    disconnect: disconnectWallet,
    close,
    getBalance,
  };
}
