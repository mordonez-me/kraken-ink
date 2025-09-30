// types/react-native-testid.d.ts
import "react";

declare module "react" {
  // Sobrescribimos PropsWithChildren para añadir testID a todo
  interface Attributes {
    testID?: string;
  }
}
