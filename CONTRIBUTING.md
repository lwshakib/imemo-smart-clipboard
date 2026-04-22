# Contributing to iMemo Smart Clipboard

First off, thank you for considering contributing to iMemo Smart Clipboard! It's people like you that make iMemo such a great tool.

## How to Contribute

### 1. Fork the Repository
Start by forking the repository to your own GitHub account. Click the "Fork" button at the top right of the [repository page](https://github.com/lwshakib/imemo-smart-clipboard).

### 2. Clone Your Fork
Clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/imemo-smart-clipboard.git
cd imemo-smart-clipboard
```

### 3. Add Upstream Remote
Add the original repository as an upstream remote to stay synced with the latest changes:

```bash
git remote add upstream https://github.com/lwshakib/imemo-smart-clipboard.git
```

### 4. Install Dependencies
iMemo uses `pnpm` for package management. Install the dependencies at the root of the project:

```bash
pnpm install
```

### 5. Create a Feature Branch
Before making any changes, create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix-name
```

### 6. Make Your Changes
Implement your changes. Ensure your code follows the existing style and is well-documented.

### 7. Run Development Servers
Test your changes locally by running the development servers:

```bash
pnpm dev
```

### 8. Commit and Push
Commit your changes with a clear and descriptive commit message:

```bash
git add .
git commit -m "feat: add amazing new feature"
```

Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

### 9. Create a Pull Request
Go to the original repository on GitHub and click on the "Pull Requests" tab. You should see a prompt to create a pull request from your recently pushed branch. Provide a detailed description of your changes and why they are necessary.

## Development Guidelines

### Monorepo Structure
- `apps/desktop`: Electron app (React + Vite).
- `apps/web`: Landing page (Next.js).
- `packages/ui`: Shared UI components.

### Environment Variables
If your changes require new environment variables, make sure to document them in the relevant `README.md` or provide a `.env.example` file.

### Code Style
- We use Prettier for code formatting. You can run `pnpm format` to format the entire codebase.
- We use ESLint for linting. You can run `pnpm lint` to check for any linting errors.

## Reporting Issues
If you find a bug or have a feature request, please [open an issue](https://github.com/lwshakib/imemo-smart-clipboard/issues). Provide as much detail as possible, including steps to reproduce the bug.

## Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Thank you for contributing!
