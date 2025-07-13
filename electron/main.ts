import { app, BrowserWindow, Menu, shell, ipcMain, dialog } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.ROOT = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.ROOT, "dist");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, "public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (process.platform === "win32") app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
const preload = path.join(__dirname, "preload.js");
const indexHtml = path.join(process.env.DIST!, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Seraphine Hybrid V1",
    icon: path.join(process.env.VITE_PUBLIC!, "icon-512x512.png"),
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    titleBarStyle: "default",
    show: false,
    autoHideMenuBar: process.platform !== "darwin",
  });

  // Show window when ready to prevent visual flash
  win.once("ready-to-show", () => {
    win?.show();

    if (process.env.VITE_DEV_SERVER_URL) {
      win?.webContents.openDevTools();
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // Development server
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Production build
    win.loadFile(indexHtml);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Apply electron-updater
  win.webContents.on("dom-ready", () => {
    console.log("DOM ready");
  });
}

app.whenReady().then(() => {
  createWindow();

  // Create application menu
  createMenu();
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});

// IPC handlers for app functionality
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.handle("get-platform", () => {
  return process.platform;
});

ipcMain.handle("show-message-box", async (_, options) => {
  const result = await dialog.showMessageBox(win!, options);
  return result;
});

ipcMain.handle("show-save-dialog", async (_, options) => {
  const result = await dialog.showSaveDialog(win!, options);
  return result;
});

ipcMain.handle("show-open-dialog", async (_, options) => {
  const result = await dialog.showOpenDialog(win!, options);
  return result;
});

function createMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: [
        {
          label: "New",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            win?.webContents.send("menu-new");
          },
        },
        {
          label: "Open",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const result = await dialog.showOpenDialog(win!, {
              properties: ["openFile"],
              filters: [
                { name: "JSON Files", extensions: ["json"] },
                { name: "All Files", extensions: ["*"] },
              ],
            });
            if (!result.canceled) {
              win?.webContents.send("menu-open", result.filePaths[0]);
            }
          },
        },
        { type: "separator" },
        {
          label: "Exit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About Seraphine",
          click: () => {
            dialog.showMessageBox(win!, {
              type: "info",
              title: "About Seraphine",
              message: "Seraphine Hybrid V1",
              detail:
                "AI-powered IoT device management system\n\nVersion: " +
                app.getVersion(),
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
