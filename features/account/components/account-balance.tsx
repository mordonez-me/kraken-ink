import { useLogger } from "@/features/shared/logger/hooks/use-logger";
import { useWalletConnect } from "@/features/shared/wallet/hooks/use-wallet-connect";
import { useGetTokens } from "@/features/shared/wallet/hooks/use-wallet-tokens";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { formatUnits } from "viem";

export const AccountBalance = () => {
  const { address } = useWalletConnect();
  const { getNativeBalance, getTokenBalance } = useGetTokens();
  const [ethBalance, setEthBalance] = useState<string>("-");
  const [astraBalance, setAstraBalance] = useState<string>("-");
  const logger = useLogger();

  const handleBalance = useCallback(async () => {
    try {
      const wei = await getNativeBalance();
      setEthBalance(formatUnits(wei, 18));
    } catch (e) {
      setEthBalance("error");

      const errorMessage = (e as Error).message;
      logger.error("Error loading ETH balance: ", errorMessage);
    }
  }, [getNativeBalance, logger]);

  const handleAstraBalance = useCallback(async () => {
    try {
      const balance = await getTokenBalance(
        process.env.EXPO_PUBLIC_TOKEN_ADDRESS as `0x${string}`
      );
      setAstraBalance(formatUnits(balance, 18));
    } catch (e) {
      setAstraBalance("error");

      const errorMessage = (e as Error).message;
      logger.error("Error loading ASTRA balance: ", errorMessage);
    }
  }, [getTokenBalance, logger]);

  useEffect(() => {
    handleBalance();
    handleAstraBalance();
  }, [handleBalance, handleAstraBalance]);

  return (
    <View className="font-bold p-8 bg-violet-700 rounded-xl">
      <View>
        <View className="mb-4">
          <Text className="text-white text-2xl font-bold">User address: </Text>
          <Text className="text-white">{address}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-white text-2xl font-bold">Eth balance: </Text>
          <Text className="text-white">{ethBalance} ETH</Text>
        </View>
        <View className="mb-4">
          <Text className="text-white text-2xl font-bold">Astra balance: </Text>
          <Text className="text-white">{astraBalance} ASTRA</Text>
        </View>
      </View>
    </View>
  );
};
