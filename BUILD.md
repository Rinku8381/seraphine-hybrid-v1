# Seraphine Hybrid V1 - Build Guide

This document explains how to build and deploy Seraphine for all supported platforms.

## 🛠️ Prerequisites

### General Requirements

- Node.js 18+ and npm
- Git

### Platform-Specific Requirements

#### For iOS (macOS only)

- Xcode 14+
- iOS 14+ deployment target
- Apple Developer account (for App Store)

#### For Android

- Android Studio
- Android SDK 33+
- JDK 11+

#### For Desktop (Electron)

- Windows: Visual Studio Build Tools
- macOS: Xcode Command Line Tools
- Linux: build-essential

#### For React Native

- Expo CLI: `npm install -g @expo/cli`
- Platform-specific tools as above

## 📱 Platform Builds

### 1. Progressive Web App (PWA)

```bash
# Build for web with PWA features
npm run build:pwa

# Deploy to web server
npm run deploy:pwa
```

**Output**: `out/` directory - ready for static hosting
**Features**: Installable, offline-capable, push notifications

### 2. Capacitor (Native iOS/Android)

#### Setup (First time only)

```bash
# Add platforms
npm run capacitor:add:ios
npm run capacitor:add:android
```

#### Development

```bash
# iOS Simulator
npm run dev:ios

# Android Emulator
npm run dev:android
```

#### Production Build

```bash
# iOS App Store
npm run build:ios

# Android Play Store
npm run build:android

# Both platforms
npm run deploy:mobile
```

**Output**:

- iOS: `ios/App/App.xcarchive`
- Android: `android/app/build/outputs/apk/`

### 3. Electron (Desktop)

#### Development

```bash
# Run in development mode
npm run electron:dev
```

#### Production Build

```bash
# All platforms
npm run build:electron

# Specific platforms
npm run electron:dist:win    # Windows
npm run electron:dist:mac    # macOS
npm run electron:dist:linux  # Linux
```

**Output**: `dist-electron/` directory

- Windows: `.exe` installer
- macOS: `.dmg` installer
- Linux: `.AppImage`, `.deb`, `.rpm`

### 4. React Native (Full Native)

#### Setup

```bash
# Navigate to React Native directory
cd react-native

# Install dependencies
npm install

# Start development server
npm start
```

#### Development

```bash
# Run development server
npm run dev:react-native

# Or from main directory
npm run dev:react-native
```

#### Production Build

```bash
# Build for both platforms
npm run build:react-native

# Individual builds (in react-native/ directory)
npm run build:android
npm run build:ios
```

## 🚀 Quick Build Commands

### Development

```bash
# Web development
npm run dev

# Desktop development
npm run electron:dev

# Mobile development (Capacitor)
npm run dev:ios        # or dev:android

# Native mobile development
npm run dev:react-native
```

### Production Builds

```bash
# All platforms
npm run build:all:production

# Individual platforms
npm run build:web
npm run build:electron
npm run build:ios
npm run build:android
npm run build:react-native
```

### Complete Deployment

```bash
# Deploy everything
npm run deploy:all
```

## 📦 Build Outputs

| Platform | Output Location      | File Types                  |
| -------- | -------------------- | --------------------------- |
| Web/PWA  | `out/`               | HTML, CSS, JS, manifest     |
| iOS      | `ios/App/`           | `.xcarchive`, `.ipa`        |
| Android  | `android/app/build/` | `.apk`, `.aab`              |
| Windows  | `dist-electron/`     | `.exe`, `.zip`              |
| macOS    | `dist-electron/`     | `.dmg`, `.zip`              |
| Linux    | `dist-electron/`     | `.AppImage`, `.deb`, `.rpm` |

## 🔧 Configuration Files

- **Next.js**: `next.config.js`
- **Capacitor**: `capacitor.config.ts`
- **Electron**: `electron-builder.config.js`
- **React Native**: `react-native/package.json`
- **PWA**: `public/manifest.json`

## 🐛 Troubleshooting

### Common Issues

#### Capacitor Build Fails

```bash
# Clean and rebuild
npm run clean
npm run capacitor:sync
npm run build:capacitor
```

#### Electron Build Fails

```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install
npm run build:electron
```

#### React Native Issues

```bash
# Clear cache
cd react-native
npm start -- --clear-cache
```

### Platform-Specific Issues

#### iOS

- Ensure Xcode is updated
- Check provisioning profiles
- Verify bundle identifier

#### Android

- Check Android SDK path
- Ensure Java 11+ is installed
- Verify keystore for release builds

#### Desktop

- Install platform build tools
- Check Node.js version compatibility

## 📋 Deployment Checklist

### Before Building

- [ ] Update version numbers
- [ ] Test on all target platforms
- [ ] Update app icons and splash screens
- [ ] Configure environment variables
- [ ] Update certificates/keys

### Web Deployment

- [ ] Configure hosting (Netlify, Vercel, etc.)
- [ ] Set up HTTPS
- [ ] Configure PWA settings
- [ ] Test service worker

### Mobile Deployment

- [ ] App Store/Play Store assets
- [ ] Screenshots and descriptions
- [ ] Privacy policy and terms
- [ ] Test on physical devices

### Desktop Deployment

- [ ] Code signing certificates
- [ ] Auto-updater configuration
- [ ] Distribution channels
- [ ] Platform-specific testing

## 🌟 Performance Tips

1. **Bundle Size**: Monitor with `npm run build` and check Next.js bundle analyzer
2. **Images**: Use Next.js image optimization
3. **PWA**: Test offline functionality
4. **Mobile**: Test on lower-end devices
5. **Desktop**: Monitor memory usage and startup time

## 📞 Support

For build issues:

1. Check this documentation
2. Review error logs
3. Test with clean environment
4. Check platform-specific requirements

---

_Last updated: $(date)_
