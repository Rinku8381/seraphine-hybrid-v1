/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: "com.seraphine.hybrid",
  productName: "Seraphine Hybrid V1",
  directories: {
    output: "dist-electron",
    buildResources: "electron/resources",
  },
  files: [
    "out/**/*",
    "electron/dist/**/*",
    "node_modules/**/*",
    "!node_modules/*/{README.md,README,readme.md,readme}",
    "!node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
    "!node_modules/*.d.ts",
    "!node_modules/.bin",
    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
    "!.editorconfig",
    "!**/._*",
    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
    "!**/{appveyor.yml,.travis.yml,circle.yml}",
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
  ],
  extraResources: [
    {
      from: "public/icon-512x512.png",
      to: "icon.png",
    },
  ],
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64", "ia32"],
      },
      {
        target: "zip",
        arch: ["x64", "ia32"],
      },
    ],
    icon: "public/icon-512x512.png",
    artifactName: "${productName}-${version}-${arch}.${ext}",
  },
  mac: {
    target: [
      {
        target: "dmg",
        arch: ["x64", "arm64"],
      },
      {
        target: "zip",
        arch: ["x64", "arm64"],
      },
    ],
    icon: "public/icon-512x512.png",
    artifactName: "${productName}-${version}-${arch}.${ext}",
    category: "public.app-category.productivity",
  },
  linux: {
    target: [
      {
        target: "AppImage",
        arch: ["x64"],
      },
      {
        target: "deb",
        arch: ["x64"],
      },
      {
        target: "rpm",
        arch: ["x64"],
      },
    ],
    icon: "public/icon-512x512.png",
    artifactName: "${productName}-${version}-${arch}.${ext}",
    category: "Utility",
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: "${productName}-${version}-Setup.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    createDesktopShortcut: "always",
  },
  dmg: {
    artifactName: "${productName}-${version}-${arch}.${ext}",
  },
  publish: {
    provider: "github",
    owner: "seraphine",
    repo: "seraphine-hybrid",
  },
};
