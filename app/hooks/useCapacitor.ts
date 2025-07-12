import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Device } from "@capacitor/device";
import { Network } from "@capacitor/network";

export interface DeviceInfo {
  platform: string;
  model: string;
  operatingSystem: string;
  osVersion: string;
  isVirtual: boolean;
}

export interface NetworkStatus {
  connected: boolean;
  connectionType: string;
}

export const useCapacitor = () => {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    connected: true,
    connectionType: "unknown",
  });

  useEffect(() => {
    const initCapacitor = async () => {
      // Check if running in native app
      setIsNative(Capacitor.isNativePlatform());

      if (Capacitor.isNativePlatform()) {
        try {
          // Hide splash screen
          await SplashScreen.hide();

          // Set status bar style
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: "#111827" });

          // Get device info
          const info = await Device.getInfo();
          setDeviceInfo({
            platform: info.platform,
            model: info.model,
            operatingSystem: info.operatingSystem,
            osVersion: info.osVersion,
            isVirtual: info.isVirtual,
          });

          // Monitor network status
          const status = await Network.getStatus();
          setNetworkStatus({
            connected: status.connected,
            connectionType: status.connectionType,
          });

          Network.addListener("networkStatusChange", (status) => {
            setNetworkStatus({
              connected: status.connected,
              connectionType: status.connectionType,
            });
          });
        } catch (error) {
          console.error("Capacitor initialization error:", error);
        }
      }
    };

    initCapacitor();
  }, []);

  const hapticFeedback = {
    light: () => {
      if (isNative) {
        Haptics.impact({ style: ImpactStyle.Light });
      }
    },
    medium: () => {
      if (isNative) {
        Haptics.impact({ style: ImpactStyle.Medium });
      }
    },
    heavy: () => {
      if (isNative) {
        Haptics.impact({ style: ImpactStyle.Heavy });
      }
    },
  };

  const showSplash = async () => {
    if (isNative) {
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
    }
  };

  const hideSplash = async () => {
    if (isNative) {
      await SplashScreen.hide();
    }
  };

  return {
    isNative,
    deviceInfo,
    networkStatus,
    hapticFeedback,
    showSplash,
    hideSplash,
  };
};
