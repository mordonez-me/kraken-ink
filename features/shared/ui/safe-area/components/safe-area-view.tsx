import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaViewProps = React.PropsWithChildren<ViewProps>;

export const SafeAreaView = ({ children, ...props }: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      {...props}>
      <View className="flex-1 px-4 pt-2">{children}</View>
    </View>
  );
};
