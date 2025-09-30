import { useCallback } from "react";
import { createPublicClient, erc20Abi, http } from "viem";
import { inkSepolia } from "viem/chains";
import { useAccount } from "wagmi";

const publicClient = createPublicClient({
  chain: inkSepolia,
  transport: http(inkSepolia.rpcUrls.default.http[0]),
});

export function useGetTokens() {
  const { address } = useAccount();

  const getNativeBalance = useCallback(async () => {
    if (!address) throw new Error("Not connected");
    const balance = await publicClient.getBalance({ address });
    return balance;
  }, [address]);

  const getTokenBalance = useCallback(
    async (tokenAddress: `0x${string}`) => {
      return await publicClient.readContract({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      });
    },
    [address]
  );

  return {
    getNativeBalance,
    getTokenBalance,
  };
}
