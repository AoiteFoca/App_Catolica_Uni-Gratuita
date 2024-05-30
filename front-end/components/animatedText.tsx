import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Animated, Easing, View } from "react-native";
import { styled } from "tailwindcss-react-native";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Loader: undefined;
};

interface AnimatedTextProps {
  text?: string;
  page?: keyof RootStackParamList; // Ensure 'page' matches one of the keys in the navigation stack
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Loader">;

const Container = styled(View);
const TextContainer = styled(View);
const AnimatedTextComponent = styled(Animated.Text);

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "UNIVERSIDADE GRATUITA",
  page = "Landing",
}) => {
  const [letters, setLetters] = useState<string[]>([]);
  const animatedValues = text.split("").map(() => new Animated.Value(0));
  const [hasNavigated, setHasNavigated] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = () => {
    if (!hasNavigated) {
      setHasNavigated(true);
      navigation.replace(page); // Use replace instead of navigate
    }
  };

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        delay: index * 100,
        useNativeDriver: true,
        easing: Easing.linear,
      });
    });

    Animated.stagger(100, animations).start(() => {
      // Navega para outra página após a conclusão da animação
      handleNavigation();
    });
  }, [text, animatedValues]);

  return (
    <Container className="flex-1 justify-center items-center">
      <TextContainer className="flex-row flex-wrap justify-center items-center">
        {letters.map((letter, index) => (
          <AnimatedTextComponent
            key={index}
            className="text-2xl font-bold text-white"
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            {letter}
          </AnimatedTextComponent>
        ))}
      </TextContainer>
    </Container>
  );
};

export default AnimatedText;
