# 📦 Seraphine Hybrid V1 - Download Guide

## Cara Download Seluruh Project

### Metode 1: Git Clone (Recommended)

```bash
git clone [repository-url]
cd seraphine-hybrid-v1
npm install
```

### Metode 2: Manual Download

Anda dapat mendownload file-file berikut secara manual:

## 📂 Struktur Project Lengkap

### 🌟 File Utama

- `package.json` - Konfigurasi utama dan scripts
- `next.config.js` - Konfigurasi Next.js untuk export
- `tsconfig.json` - Konfigurasi TypeScript
- `BUILD.md` - Panduan lengkap build untuk semua platform

### 🌐 Progressive Web App (PWA)

- `public/manifest.json` - PWA manifest
- `public/sw.js` - Service worker
- `public/offline.html` - Halaman offline
- `public/icon-*.png` - Icons PWA
- `public/apple-touch-icon.png` - Apple touch icon

### 📱 Capacitor (Native Mobile)

- `capacitor.config.ts` - Konfigurasi Capacitor
- `app/hooks/useCapacitor.ts` - Hook untuk fitur native

### 🖥️ Electron (Desktop)

- `electron/main.ts` - Process utama Electron
- `electron/preload.ts` - Preload script
- `electron-builder.config.js` - Konfigurasi build desktop
- `app/hooks/useElectron.ts` - Hook untuk fitur desktop

### 📲 React Native

- `react-native/package.json` - Konfigurasi React Native
- `react-native/App.tsx` - App React Native
- `react-native/components/` - Komponen native
- `react-native/hooks/useNativePlatform.ts` - Hook platform native

### 🎨 Asset Structure

- `public/` - Asset publik (icons, manifest)
- `src/assets/images/` - Gambar statis
- `src/assets/icons/` - File ikon
- `src/assets/audio/` - File audio
- `src/assets/lottie/` - Animasi Lottie

### 🛠️ Build & Deploy

- `scripts/deploy.sh` - Script deployment
- `app/utils/platformDetection.ts` - Deteksi platform universal

### 🧩 Komponen App (Existing)

- `app/components/` - Semua komponen UI
- `app/globals.css` - Styles global
- `app/layout.tsx` - Layout dengan PWA metadata
- `app/page.tsx` - Halaman utama

## 📋 Checklist Download

### ✅ Core Files

- [ ] `package.json` - Dependencies dan scripts
- [ ] `next.config.js` - Konfigurasi Next.js
- [ ] `tsconfig.json` - TypeScript config

### ✅ PWA Files

- [ ] `public/manifest.json`
- [ ] `public/sw.js`
- [ ] `public/offline.html`
- [ ] `public/icon-192x192.png`
- [ ] `public/icon-512x512.png`
- [ ] `public/apple-touch-icon.png`

### ✅ Platform Configs

- [ ] `capacitor.config.ts`
- [ ] `electron-builder.config.js`
- [ ] `react-native/package.json`

### ✅ Source Code

- [ ] `app/` directory (semua komponen)
- [ ] `electron/` directory
- [ ] `react-native/` directory
- [ ] `src/assets/` directory structure

### ✅ Scripts & Utils

- [ ] `scripts/deploy.sh`
- [ ] `app/hooks/useCapacitor.ts`
- [ ] `app/hooks/useElectron.ts`
- [ ] `app/utils/platformDetection.ts`
- [ ] `BUILD.md`

## 🚀 Setup Setelah Download

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Setup React Native** (optional)

   ```bash
   cd react-native
   npm install
   ```

3. **Install Platform Tools**

   ```bash
   # Capacitor platforms
   npm run capacitor:add:ios
   npm run capacitor:add:android

   # Electron dependencies sudah included
   ```

4. **Test Development**

   ```bash
   # Web
   npm run dev

   # Desktop
   npm run electron:dev

   # Mobile
   npm run dev:ios
   npm run dev:android
   ```

## 📦 Build Commands

```bash
# Build semua platform
npm run build:all:production

# Individual builds
npm run build:web        # PWA
npm run build:electron   # Desktop
npm run build:ios        # iOS
npm run build:android    # Android
```

## 💾 Backup & Archive

Untuk membuat backup sendiri:

```bash
# Exclude node_modules dan build folders
tar -czf seraphine-backup.tar.gz \
  --exclude=node_modules \
  --exclude=out \
  --exclude=dist-electron \
  --exclude=.next \
  --exclude=*.log \
  .
```

## 🎯 Platform Targets

Dengan setup ini, Anda bisa deploy ke:

- 🌐 **Web Hosting** (Netlify, Vercel, dll)
- 📱 **App Store** (iOS)
- 🤖 **Google Play Store** (Android)
- 🖥️ **Desktop** (Windows, macOS, Linux)
- 📲 **PWA** (Installable web app)

---

_Total files: ~50+ files_  
_Platform support: Web, iOS, Android, Windows, macOS, Linux_  
_Tech stack: Next.js, React, TypeScript, Capacitor, Electron_
