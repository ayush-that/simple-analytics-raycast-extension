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

- **menu-bar-stats** (`src/menu-bar-stats.tsx`): Menu bar command with 1-minute auto-refresh. Shows visitors/pageviews in menu bar title, with dropdown displaying detailed stats (top pages, referrers, avg time on page). Supports cycling between websites and switching time ranges.
- **manage-websites** (`src/manage-websites.tsx`): List view for adding, editing, and removing tracked websites. Tests API connection before saving. Supports setting active website.

### Library Modules (`src/lib/`)

- **api.ts**: Simple Analytics API client using `simpleanalytics.com/{domain}.json`. Includes `fetchStats()`, `testConnection()`, and `getDashboardUrl()`.
- **storage.ts**: LocalStorage wrapper for websites, active website ID, and time range. Includes `cycleToNextWebsite()` for rotating between sites.
- **types.ts**: TypeScript interfaces: `Website`, `StatsResponse`, `PageStats`, `ReferrerStats`, `HistogramEntry`, `TimeRange`, `StatsState`.
- **format.ts**: `formatNumber()` (1000→"1k"), `formatDuration()` (seconds→"1m 30s"), `getDateRange()`, `getTimeRangeLabel()`, `truncatePath()`.

### Assets

SVG icons in `assets/` for menu bar UI (chart-bar, user, eye, clock, globe, calendar, etc.).

### Data Flow

1. Websites stored in Raycast LocalStorage as JSON array
2. Menu bar uses `useCachedPromise` from `@raycast/utils` for data fetching with caching
3. Stats fetched from Simple Analytics API with configurable time range
4. Users can cycle websites via shortcut or switch via submenu

### Extension Preferences

Defined in `package.json` under `preferences`:

- `displayMode`: What to show in menu bar (visitors/pageviews/both)
- `defaultTimeRange`: Default time period for stats (today/7d/30d)
