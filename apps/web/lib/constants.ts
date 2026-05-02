import pkg from "../package.json";

const version = pkg.version;

export const DOWNLOAD_URLS = {
  WINDOWS: `https://github.com/lwshakib/imemo-smart-clipboard/releases/download/v${version}/iMemo-Smart-Clipboard-Windows-${version}-Setup.exe`,
  MAC: `https://github.com/lwshakib/imemo-smart-clipboard/releases/download/v${version}/iMemo-Smart-Clipboard-Mac-${version}.dmg`,
  LINUX: `https://github.com/lwshakib/imemo-smart-clipboard/releases/download/v${version}/iMemo-Smart-Clipboard-Linux-${version}.AppImage`,
};

export const SITE_CONFIG = {
  name: "iMemo Smart Clipboard",
  description:
    "The ultimate companion for your desktop clipboard. Designed for developers, writers, and power users who value speed and privacy.",
  url: "https://imemo-smart-clipboard-web.vercel.app",
}
