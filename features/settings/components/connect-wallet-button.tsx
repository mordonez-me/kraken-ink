import { useWalletConnect } from "@/features/shared/wallet/hooks/use-wallet-connect";
import { shortenAddress } from "@/features/shared/wallet/utils/shorten-address";
import { Pressable, Text, View } from "react-native";

export default function ConnectWalletButton() {
  const { isConnected, address, connect, disconnect } = useWalletConnect();

  if (isConnected) {
    return (
      <View className="font-bold p-8 bg-violet-700 rounded-xl">
        <Text className="text-white mb-2 text-2xl font-bold">Conectado</Text>
        <Text className="text-white">{shortenAddress(address ?? "")}</Text>
        <Pressable
          onPress={disconnect}
          className="bg-violet-300 p-4 rounded-xl mt-4">
          <Text className="text-center">Desconectar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-white mb-4">
        Tap the button to connect your wallet
      </Text>
      <Pressable
        onPress={connect}
        className="p-4 rounded-xl bg-violet-700">
        <Text className="text-white text-center">Connect Wallet</Text>
      </Pressable>
    </View>
  );
}
