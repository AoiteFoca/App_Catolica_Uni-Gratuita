import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Loader: undefined;
};

interface AnimatedTextProps {
  text?: string;
  page?: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Loader">;

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "UNIVERSIDADE GRATUITA",
  page = "Home",
}: any) => {
  const [letters, setLetters] = useState<string[]>([]);
  const animatedValues = text.split("").map(() => new Animated.Value(0));

  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    navigation.navigate(page);
  };

  useEffect(() => {
    setLetters(text.split(""));
  }, [text]);

  useEffect(() => {
    const animations = animatedValues.map((animatedValue: any, index: any) => {
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
      handleLogin();
      // setLetters(text.split(""));
    });
  }, [text, animatedValues]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default AnimatedText;
