import "react-native";

declare module "react-native" {
  interface ViewProps {
    testID?: string;
  }
  interface TextProps {
    testID?: string;
  }
  interface ImageProps {
    testID?: string;
  }
  interface ScrollViewProps {
    testID?: string;
  }
  interface TouchableOpacityProps {
    testID?: string;
  }
  interface PressableProps {
    testID?: string;
  }
  // Agrega otros componentes que uses
}
