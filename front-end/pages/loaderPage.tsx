import React from "react";
import { View } from "react-native";
import AnimatedText from "../components/animatedText";

interface LoaderPageProps {
  text?: string;
  page?: string;
}

const LoaderPage: React.FC<LoaderPageProps> = ({
  text = "UNIVERSIDADE GRATUITA",
  page = "Home",
}: any) => {
  return (
    <View className="flex-1 bg-red-600 justify-center items-center">
      <AnimatedText text={text} page={page} />
    </View>
  );
};

export default LoaderPage;
