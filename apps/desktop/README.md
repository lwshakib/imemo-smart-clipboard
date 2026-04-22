<p align="left">
  <img src="public/logo.svg" width="64" height="64" alt="iMemo Logo">
</p>

# iMemo Desktop

This is the main desktop application for iMemo Smart Clipboard, built with Electron, React, Vite, and TailwindCSS.

## 🚀 Development

### Run in Development

To start the desktop app in development mode:

```bash
pnpm dev
```

### Build for Production

To build the desktop app for your current platform:

```bash
pnpm build
```

The output will be in the `release` and `dist` directories.

## 🛠️ Tech Stack

- **Electron**: Cross-platform desktop framework.
- **Vite**: Ultra-fast build tool and dev server.
- **React**: UI library.
- **TailwindCSS**: Utility-first CSS framework.
- **Electron Store**: Persistent storage for clipboard history and settings.

## 📁 Structure

- `electron/`: Electron main process and preload scripts.
- `src/`: React renderer process (UI).
- `public/`: Static assets (icons, etc.).
