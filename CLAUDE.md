# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
bun run dev          # Start development mode with hot reload
bun run build        # Build for production
bun run lint         # Run ESLint
bun run fix-lint     # Auto-fix lint issues
bun run format       # Format with Prettier
bun run publish      # Publish to Raycast Store
```

## Architecture

This is a Raycast extension for displaying Simple Analytics statistics in the macOS menu bar.

### Commands

- **menu-bar-stats** (`src/menu-bar-stats.tsx`): Menu bar command that displays website stats with 1-minute auto-refresh interval. Shows visitors/pageviews based on user preference.
- **manage-websites** (`src/manage-websites.tsx`): List view for adding, editing, and removing tracked websites.

### Library Modules (`src/lib/`)

- **api.ts**: Simple Analytics API client. Fetches stats from `simpleanalytics.com/{domain}.json` with optional API key authentication.
- **storage.ts**: LocalStorage wrapper for persisting websites, active website selection, and time range preferences.
- **types.ts**: TypeScript interfaces for `Website`, `StatsResponse`, `Preferences`, and related types.
- **format.ts**: Number formatting (1000→"1k"), duration formatting, date range calculation, and path truncation utilities.

### Data Flow

1. Websites are stored in Raycast LocalStorage as JSON array
2. Menu bar fetches stats for the active website using the Simple Analytics API
3. Users can cycle between multiple websites or switch via submenu
4. Time range (today/7d/30d) persists across sessions

### Extension Preferences

Defined in `package.json` under `preferences`:

- `displayMode`: What to show in menu bar (visitors/pageviews/both)
- `defaultTimeRange`: Default time period for stats
