# CV Forge

A modern CV/Resume builder built with React Router 7, TypeScript, and Tailwind CSS.

## Development Setup

### Prerequisites

- Node.js 22.17.1+ or [asdf](https://asdf-vm.com/guide/getting-started.html) for automatic version management

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cv-forge
   ```

2. **Setup Node.js version:**

   **Option A: Using asdf (Recommended)**
   ```bash
   # Install Node.js plugin if not already installed
   asdf plugin add nodejs

   # Install project Node.js version (defined in .tool-versions)
   asdf install
   ```

   **Option B: Manual Installation**
   - Ensure Node.js 22.17.1+ is installed

3. **Install dependencies:**
   ```bash
   npm install
   ```
   
   > **Note:** Dependencies are automatically pinned to exact versions (no `^` ranges) to ensure consistent installations across environments. The setup automatically configures `.npmrc` with `save-exact=true`.

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## Development Tools

This project includes automated code quality tools and pre-commit hooks.

### Code Quality Commands
```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Auto-fix linting issues
npm run check         # Run typecheck + lint
npm run check:fix     # Run typecheck + format
```

### Git Hooks (Husky)
- **Pre-commit**: Auto-fixes code formatting on staged files
- **Commit messages**: Must follow [Conventional Commits](https://www.conventionalcommits.org/) format

**Valid commit examples:**
```bash
feat: add user authentication
fix: resolve memory leak
docs: update API documentation
```

### VS Code
Install recommended extensions when prompted. The workspace is configured for:
- Format on save with ESLint
- TypeScript auto-imports
- Debug with `F5`

## Available Scripts

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server

# Code Quality
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint checking
npm run lint:fix      # ESLint auto-fix
npm run check         # Typecheck + lint
npm run check:fix     # Typecheck + lint:fix

# Testing
npm run test          # Run unit tests
npm run test:watch    # Run unit tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:e2e      # Run E2E tests (Playwright)
npm run test:all      # Run all tests
```

## Troubleshooting

### Linting Issues
```bash
# Check what ESLint will fix
npm run lint

# Auto-fix all fixable issues
npm run lint:fix
```

### TypeScript Errors
```bash
# Generate types and check for errors
npm run typecheck
```

### Commit Rejected
If your commit is rejected:
1. **Check commit message format** (must follow conventional commits)
2. **Fix linting errors** with `npm run lint:fix`
3. **Retry the commit**

### VS Code Setup
1. **Install recommended extensions** (popup should appear)
2. **Reload VS Code** after extension installation
3. **Check workspace settings** are applied

## Testing

The project uses a comprehensive testing setup:
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright (Chrome, Firefox, Safari)
- **Coverage**: Automatic reporting with v8

### GitHub Actions
All pull requests automatically run:
- Linting and type checking
- Unit tests with coverage
- E2E tests across browsers

## Contributing

1. Follow the established code style (enforced by ESLint)
2. Use conventional commit messages
3. Ensure all tests pass: `npm run test:all`
4. Let the pre-commit hooks guide you

The development tools will automatically maintain code quality and consistency.
