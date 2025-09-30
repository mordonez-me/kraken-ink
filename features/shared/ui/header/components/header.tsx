import { Text, View } from "react-native";
import { HeaderProps } from "./header-props";

export const Header = ({ title }: Readonly<HeaderProps>) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-4xl font-bold">{title}</Text>
    </View>
  );
};
