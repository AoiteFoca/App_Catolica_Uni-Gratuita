// nativewind.d.ts
import "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface StatusBarProps {
    style?: "dark" | "light";
    translucent?: boolean;
    backgroundColor?: string;
  }
  interface IconProps {
    name: string;
    size: number;
    color: string;
  }
  
  // Adicione outras interfaces de props conforme necessário
}