#!/bin/bash

# Seraphine Hybrid V1 - Deployment Script
# This script builds and deploys the app for all platforms

set -e

echo "🚀 Starting Seraphine Hybrid V1 deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Parse command line arguments
PLATFORMS=""
PRODUCTION=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --web)
            PLATFORMS="$PLATFORMS web"
            shift
            ;;
        --desktop)
            PLATFORMS="$PLATFORMS desktop"
            shift
            ;;
        --mobile)
            PLATFORMS="$PLATFORMS mobile"
            shift
            ;;
        --react-native)
            PLATFORMS="$PLATFORMS react-native"
            shift
            ;;
        --all)
            PLATFORMS="web desktop mobile react-native"
            shift
            ;;
        --production)
            PRODUCTION=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Usage: $0 [--web] [--desktop] [--mobile] [--react-native] [--all] [--production]"
            exit 1
            ;;
    esac
done

# Default to all platforms if none specified
if [ -z "$PLATFORMS" ]; then
    PLATFORMS="web desktop mobile"
fi

print_status "Building for platforms: $PLATFORMS"
if [ "$PRODUCTION" = true ]; then
    print_status "Production mode enabled"
fi

# Clean previous builds
print_status "Cleaning previous builds..."
npm run clean

# Install dependencies
print_status "Installing dependencies..."
npm install

# Function to build web/PWA
build_web() {
    print_status "Building Web/PWA version..."
    npm run build:web
    print_success "Web/PWA build completed"
}

# Function to build desktop
build_desktop() {
    print_status "Building Desktop (Electron) version..."
    if [ "$PRODUCTION" = true ]; then
        npm run electron:dist
    else
        npm run build:electron
    fi
    print_success "Desktop build completed"
}

# Function to build mobile
build_mobile() {
    print_status "Building Mobile (Capacitor) version..."
    npm run build:capacitor
    
    # Check if we can build iOS (macOS only)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_status "Building iOS version..."
        npm run build:ios || print_warning "iOS build failed (check Xcode setup)"
    else
        print_warning "Skipping iOS build (macOS required)"
    fi
    
    # Build Android if tools are available
    if command -v android &> /dev/null || [ -d "$ANDROID_HOME" ]; then
        print_status "Building Android version..."
        npm run build:android || print_warning "Android build failed (check Android SDK setup)"
    else
        print_warning "Skipping Android build (Android SDK not found)"
    fi
    
    print_success "Mobile build completed"
}

# Function to build React Native
build_react_native() {
    print_status "Building React Native version..."
    
    if [ ! -d "react-native" ]; then
        print_error "React Native directory not found"
        return 1
    fi
    
    cd react-native
    
    if [ ! -f "package.json" ]; then
        print_error "React Native package.json not found"
        cd ..
        return 1
    fi
    
    npm install
    
    # Build for available platforms
    if command -v expo &> /dev/null; then
        print_status "Building with Expo..."
        npm run build:android || print_warning "React Native Android build failed"
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            npm run build:ios || print_warning "React Native iOS build failed"
        fi
    else
        print_warning "Expo CLI not found, skipping React Native builds"
    fi
    
    cd ..
    print_success "React Native build completed"
}

# Build each requested platform
for platform in $PLATFORMS; do
    case $platform in
        web)
            build_web
            ;;
        desktop)
            build_desktop
            ;;
        mobile)
            build_mobile
            ;;
        react-native)
            build_react_native
            ;;
        *)
            print_error "Unknown platform: $platform"
            ;;
    esac
done

# Summary
print_success "🎉 Deployment completed!"
print_status "Build artifacts:"

if echo "$PLATFORMS" | grep -q "web"; then
    echo "  📱 Web/PWA: out/"
fi

if echo "$PLATFORMS" | grep -q "desktop"; then
    echo "  🖥️  Desktop: dist-electron/"
fi

if echo "$PLATFORMS" | grep -q "mobile"; then
    echo "  📱 iOS: ios/App/"
    echo "  🤖 Android: android/app/build/"
fi

if echo "$PLATFORMS" | grep -q "react-native"; then
    echo "  📱 React Native: react-native/dist/"
fi

print_status "Next steps:"
echo "  • Test builds on target devices"
echo "  • Deploy to hosting/app stores"
echo "  • Update version numbers for next release"

echo ""
print_success "All done! 🚀"
