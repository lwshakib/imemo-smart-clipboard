<p align="left">
  <img src="apps/web/public/logo.svg" width="64" height="64" alt="iMemo Logo">
</p>

# iMemo Smart Clipboard

iMemo is a professional-grade, cross-platform smart clipboard manager designed for efficiency and speed. It intelligently captures text and images, provides instant previews, and allows for seamless workflow integration.

## ✨ Features

- **Smart Capture**: Automatically monitors and saves text and image clipboard history.
- **Instant Preview**: View detailed content of clipboard items in a dedicated preview window.
- **Global Hotkey**: Access your clipboard history instantly with `Alt+V`.
- **Instant Paste**: Paste selected items directly into any active application.
- **Starred Items**: Save important snippets for quick access.
- **Cross-Platform**: Built with Electron for seamless performance on Windows and macOS.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (v9 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lwshakib/imemo-smart-clipboard.git
   cd imemo-smart-clipboard
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

### Development

Run the development server for both the desktop app and the web landing page:

```bash
pnpm dev
```

### Build

Build the project for production:

```bash
pnpm build
```

## 📂 Project Structure

- `apps/desktop`: The main Electron application.
- `apps/web`: The Next.js landing page and documentation site.
- `packages/ui`: Shared UI components based on shadcn/ui.
- `packages/typescript-config`: Shared TypeScript configurations.
- `packages/eslint-config`: Shared ESLint rules.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
