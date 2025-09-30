import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ConnectCta() {
  const router = useRouter();

  return (
    <View className="text-black font-bold p-8  bg-violet-700 rounded-xl">
      <Text className="text-center text-2xl mb-16 text-white">
        Connect your wallet in the settings tab to see your balance
      </Text>
      <Pressable
        onPress={() => {
          router.push("/(tabs)/settings");
        }}>
        <View className="bg-violet-300 p-4 rounded-xl">
          <Text className="text-center">Go to settings</Text>
        </View>
      </Pressable>
    </View>
  );
}
