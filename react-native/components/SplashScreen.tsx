import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to next screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("Terms");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>SERAPHINE</Text>
        <Text style={styles.subtitle}>Hybrid V1</Text>
        <Text style={styles.tagline}>AI-Powered IoT Management</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#22d3ee",
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#ff006e",
    marginBottom: 16,
    fontWeight: "300",
  },
  tagline: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default SplashScreen;
