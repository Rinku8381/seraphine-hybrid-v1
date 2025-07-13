import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

// Import shared components (these would need to be adapted from the web version)
import SplashScreenComponent from "./components/SplashScreen";
import TermsScreen from "./components/TermsScreen";
import LoginScreen from "./components/LoginScreen";
import OnboardingStack from "./components/OnboardingStack";
import Dashboard from "./components/Dashboard";

export type RootStackParamList = {
  Splash: undefined;
  Terms: undefined;
  Login: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentScreen, setCurrentScreen] =
    useState<keyof RootStackParamList>("Splash");

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#111827" },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreenComponent} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="#111827" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
});
