# AGENTS.md

This file provides guidance for agentic coding agents operating in this repository.

## Build and Development Commands

```bash
bun run dev          # Start development mode with hot reload
bun run build        # Build for production
bun run lint         # Run ESLint
bun run fix-lint     # Auto-fix lint issues
bun run format       # Format with Prettier
bun run publish      # Publish to Raycast Store
```

## Code Style Guidelines

### Imports

Organize imports in the following order with blank lines between groups:

1. `@raycast/api` imports (named imports)
2. `@raycast/utils` imports
3. `react` imports (useNamed imports from react)
4. Local relative imports (`./lib/*`)

```typescript
import {
  MenuBarExtra,
  open,
  openCommandPreferences,
  getPreferenceValues,
  launchCommand,
  LaunchType,
  showHUD,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useCallback, useState } from "react";
import { fetchStats, getDashboardUrl } from "./lib/api";
import { getActiveWebsite, getWebsites } from "./lib/storage";
import { formatNumber, formatDuration } from "./lib/format";
import { TimeRange, Website, StatsResponse } from "./lib/types";
```

### TypeScript

- Enable strict mode in all TypeScript code
- Use interfaces for object types, type aliases for unions/primitives
- Define shared types in `src/lib/types.ts`
- Use optional properties (`?`) when values may be undefined
- Use `Promise<ReturnType>` for async function return types
- Avoid `any` type; use `unknown` when type is uncertain

```typescript
export interface Website {
  id: string;
  domain: string;
  apiKey?: string;
  label?: string;
}

export type TimeRange = "today" | "7d" | "30d";
```

### Naming Conventions

- **Interfaces**: PascalCase (e.g., `Website`, `StatsResponse`)
- **Variables & Functions**: camelCase (e.g., `fetchStats`, `activeWebsite`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `WEBSITES_KEY`, `BASE_URL`)
- **Components**: PascalCase, match filename (e.g., `MenuBarStats`)
- **Icons object**: `Icons` (singular), camelCase keys (e.g., `Icons.chartBar`)

### Error Handling

- Throw `Error` objects with descriptive messages
- Wrap async operations in try/catch blocks
- Return error objects for recoverable errors: `{ success: boolean; error?: string }`
- Use `showToast` for user feedback on errors
- Check error type: `error instanceof Error ? error.message : "Unknown error"`

```typescript
try {
  const result = await fetchStats(options);
  return { success: true };
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error",
  };
}
```

### React Patterns

- Use `useCallback` for event handlers to maintain referential identity
- Use `useState` for local component state
- Use `useEffect` for side effects (data loading on mount)
- Use `useCachedPromise` from `@raycast/utils` for data fetching with caching
- Destructuring with defaults for optional props: `function Component({ prop = defaultValue }: Props)`
- Helper functions defined outside components or as useCallback

```typescript
const handleCycleWebsite = useCallback(async () => {
  const nextWebsite = await cycleToNextWebsite();
  setCurrentWebsite(nextWebsite);
  await showHUD(`Switched to ${nextWebsite?.label || nextWebsite?.domain || "website"}`);
}, []);
```

### Component Structure

- Default export the main component function
- Place helper functions after the main component or as separate utilities
- Keep components focused; extract complex logic to library modules
- Use named exports for utility functions in `src/lib/`

### UI and UX

- Use `showHUD` for transient feedback after user actions
- Use `showToast` with appropriate styles (`Animated`, `Success`, `Failure`)
- Provide loading states with `isLoading` flags
- Handle empty states explicitly
- Use keyboard shortcuts for common actions: `{ modifiers: ["cmd"], key: "r" }`

### Icon Usage

Define icons as a constant object using SVG filenames from `assets/`:

```typescript
const Icons = {
  chartBar: { source: "chart-bar.svg" },
  user: { source: "user.svg" },
  refresh: { source: "refresh.svg" },
};
```

### Constants

Define configuration constants at module level:

```typescript
const BASE_URL = "https://simpleanalytics.com";
const API_VERSION = 6;
const DEFAULT_FIELDS = ["pageviews", "visitors", "seconds_on_page", "pages", "referrers"];
```

### File Organization

- **Commands**: `src/*.tsx` - Main entry points for Raycast commands
- **Library**: `src/lib/*.ts` - Shared utilities (api.ts, storage.ts, types.ts, format.ts)
- **Assets**: `assets/*.svg` - Icon files used in UI

### Formatting

- No comments unless explaining complex business logic
- Use Prettier for formatting (`bun run format`)
- Strings use double quotes
- Trailing commas in multi-line objects/arrays
- Semicolons at statement ends

### General Rules

- No hardcoded API keys or secrets
- Use Raycast LocalStorage for persistence
- Handle null/undefined states explicitly
- Use descriptive variable names that indicate purpose
- Keep functions small and focused on single tasks
