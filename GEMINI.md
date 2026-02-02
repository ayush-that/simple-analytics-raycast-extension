# Simple Analytics Raycast Extension

## Project Overview

This is an unofficial [Raycast](https://raycast.com) extension for [Simple Analytics](https://simpleanalytics.com). It allows users to view website statistics (visitors, pageviews, top pages, referrers) directly from the macOS menu bar.

**Key Features:**
*   **Menu Bar Stats:** Displays real-time statistics in the menu bar.
*   **Multi-site Support:** Manage and switch between multiple websites.
*   **Customizable:** Configure time ranges (Today, 7d, 30d) and display preferences.
*   **Privacy:** Supports both public domains and private stats via API keys.

**Architecture:**
*   **Frontend:** Built with React and the Raycast API (`@raycast/api`).
*   **State Management:** Uses Raycast's `useCachedPromise` for data fetching and local storage for configuration.
*   **API:** Interacts with the Simple Analytics API (`simpleanalytics.com`).
*   **Language:** TypeScript.

## Building and Running

**Prerequisites:**
*   [Node.js](https://nodejs.org/) (Required by Raycast)
*   [Bun](https://bun.sh/) (Strictly used for package management)
*   [Raycast](https://raycast.com/) application installed

**Commands:**

*   **Install Dependencies:**
    ```bash
    bun install
    ```

*   **Start Development Server:**
    ```bash
    bun run dev
    ```
    This starts the Raycast development server. The extension should appear in Raycast's root search.

*   **Build for Production:**
    ```bash
    bun run build
    ```
    Compiles the extension to the `dist` directory.

*   **Linting & Formatting:**
    ```bash
    bun run lint
    bun run fix-lint
    bun run format
    ```

## Development Conventions

*   **Package Manager:** Always use `bun`. Do not use `npm` or `yarn`.
*   **Code Style:**
    *   Use **TypeScript** for all logic.
    *   Follow **Prettier** formatting (configuration in `.prettierrc`).
    *   Adhere to **ESLint** rules (configuration in `.eslintrc.json`).
*   **Raycast API:**
    *   Use functional components with React hooks.
    *   Prefer `useCachedPromise` from `@raycast/utils` for async operations to handle caching and loading states automatically.
    *   Use Raycast's built-in UI components (`MenuBarExtra`, `List`, `Form`, etc.).
*   **Structure:**
    *   `src/`: Source code.
        *   `src/lib/`: Shared utilities, API clients, and type definitions.
        *   `src/*.tsx`: Command entry points (e.g., `menu-bar-stats.tsx`, `manage-websites.tsx`).
    *   `assets/`: Icons and static assets.
