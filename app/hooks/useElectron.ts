import { useEffect, useState } from "react";

// Extend the Window interface to include our electron APIs
declare global {
  interface Window {
    electronAPI?: {
      getPlatform: () => Promise<string>;
      getAppVersion: () => Promise<string>;
      showMessageBox: (options: any) => Promise<any>;
      showSaveDialog: (options: any) => Promise<any>;
      showOpenDialog: (options: any) => Promise<any>;
      openWindow: (url: string) => Promise<void>;
      onMenuNew: (callback: () => void) => () => void;
      onMenuOpen: (callback: (filePath: string) => void) => () => void;
    };
    electronStore?: {
      set: (key: string, value: any) => void;
      get: (key: string) => any;
      remove: (key: string) => void;
    };
  }
}

export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);
  const [platform, setPlatform] = useState<string>("");
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    const checkElectron = async () => {
      if (typeof window !== "undefined" && window.electronAPI) {
        setIsElectron(true);

        try {
          const platformInfo = await window.electronAPI.getPlatform();
          const versionInfo = await window.electronAPI.getAppVersion();
          setPlatform(platformInfo);
          setVersion(versionInfo);
        } catch (error) {
          console.error("Error getting Electron info:", error);
        }
      }
    };

    checkElectron();
  }, []);

  const showDialog = async (
    type: "info" | "warning" | "error" | "question",
    title: string,
    message: string,
  ) => {
    if (isElectron && window.electronAPI) {
      return await window.electronAPI.showMessageBox({
        type,
        title,
        message,
        buttons: ["OK"],
      });
    }
    return null;
  };

  const showConfirmDialog = async (title: string, message: string) => {
    if (isElectron && window.electronAPI) {
      const result = await window.electronAPI.showMessageBox({
        type: "question",
        title,
        message,
        buttons: ["Yes", "No"],
        defaultId: 0,
        cancelId: 1,
      });
      return result.response === 0;
    }
    return window.confirm(message);
  };

  const saveFile = async (
    defaultPath?: string,
    filters?: { name: string; extensions: string[] }[],
  ) => {
    if (isElectron && window.electronAPI) {
      return await window.electronAPI.showSaveDialog({
        defaultPath,
        filters: filters || [
          { name: "JSON Files", extensions: ["json"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });
    }
    return null;
  };

  const openFile = async (
    filters?: { name: string; extensions: string[] }[],
  ) => {
    if (isElectron && window.electronAPI) {
      return await window.electronAPI.showOpenDialog({
        properties: ["openFile"],
        filters: filters || [
          { name: "JSON Files", extensions: ["json"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });
    }
    return null;
  };

  const storeData = (key: string, value: any) => {
    if (isElectron && window.electronStore) {
      window.electronStore.set(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getData = (key: string) => {
    if (isElectron && window.electronStore) {
      return window.electronStore.get(key);
    } else {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  };

  const removeData = (key: string) => {
    if (isElectron && window.electronStore) {
      window.electronStore.remove(key);
    } else {
      localStorage.removeItem(key);
    }
  };

  const setupMenuListeners = (
    onNew?: () => void,
    onOpen?: (filePath: string) => void,
  ) => {
    if (isElectron && window.electronAPI) {
      const cleanupFunctions: (() => void)[] = [];

      if (onNew) {
        const cleanup = window.electronAPI.onMenuNew(onNew);
        cleanupFunctions.push(cleanup);
      }

      if (onOpen) {
        const cleanup = window.electronAPI.onMenuOpen(onOpen);
        cleanupFunctions.push(cleanup);
      }

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    }
    return () => {};
  };

  return {
    isElectron,
    platform,
    version,
    showDialog,
    showConfirmDialog,
    saveFile,
    openFile,
    storeData,
    getData,
    removeData,
    setupMenuListeners,
  };
};
