import { useState, useEffect } from "react";
import { Platform, Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NativeDeviceInfo {
  platform: string;
  model: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
  deviceId: string;
  isTablet: boolean;
}

export interface ScreenDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export const useNativePlatform = () => {
  const [deviceInfo, setDeviceInfo] = useState<NativeDeviceInfo | null>(null);
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    scale: Dimensions.get("window").scale,
    fontScale: Dimensions.get("window").fontScale,
  });

  useEffect(() => {
    const getDeviceInfo = async () => {
      try {
        const info: NativeDeviceInfo = {
          platform: Platform.OS,
          model: await DeviceInfo.getModel(),
          systemVersion: await DeviceInfo.getSystemVersion(),
          appVersion: await DeviceInfo.getVersion(),
          buildNumber: await DeviceInfo.getBuildNumber(),
          deviceId: await DeviceInfo.getUniqueId(),
          isTablet: await DeviceInfo.isTablet(),
        };
        setDeviceInfo(info);
      } catch (error) {
        console.error("Error getting device info:", error);
      }
    };

    getDeviceInfo();

    // Listen for dimension changes
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenDimensions({
        width: window.width,
        height: window.height,
        scale: window.scale,
        fontScale: window.fontScale,
      });
    });

    return () => subscription?.remove();
  }, []);

  const hapticFeedback = {
    light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    success: () =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    warning: () =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    error: () =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    selection: () => Haptics.selectionAsync(),
  };

  const storage = {
    setItem: async (key: string, value: any) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Storage setItem error:", error);
      }
    },

    getItem: async (key: string) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error("Storage getItem error:", error);
        return null;
      }
    },

    removeItem: async (key: string) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error("Storage removeItem error:", error);
      }
    },

    clear: async () => {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.error("Storage clear error:", error);
      }
    },
  };

  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";
  const isTablet = deviceInfo?.isTablet || false;
  const isLandscape = screenDimensions.width > screenDimensions.height;

  return {
    deviceInfo,
    screenDimensions,
    hapticFeedback,
    storage,
    isIOS,
    isAndroid,
    isTablet,
    isLandscape,
    platform: Platform.OS,
  };
};
