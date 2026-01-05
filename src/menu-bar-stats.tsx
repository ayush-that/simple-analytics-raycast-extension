import {
  MenuBarExtra,
  open,
  openCommandPreferences,
  getPreferenceValues,
  launchCommand,
  LaunchType,
  showHUD,
} from "@raycast/api";
import { useCallback, useState, useEffect, useRef } from "react";
import { fetchStats, getDashboardUrl } from "./lib/api";
import {
  getActiveWebsite,
  getWebsites,
  cycleToNextWebsite,
  getTimeRange,
  setTimeRange as saveTimeRange,
  setActiveWebsiteId,
} from "./lib/storage";
import { formatNumber, formatDuration, getTimeRangeLabel, truncatePath } from "./lib/format";
import { Preferences, TimeRange, Website, StatsResponse } from "./lib/types";

const Icons = {
  chartBar: { source: "chart-bar.svg" },
  user: { source: "user.svg" },
  eye: { source: "eye.svg" },
  clock: { source: "clock.svg" },
  globe: { source: "globe.svg" },
  calendar: { source: "calendar.svg" },
  arrowRight: { source: "arrow-right.svg" },
  refresh: { source: "refresh.svg" },
  settings: { source: "settings.svg" },
  plus: { source: "plus.svg" },
  check: { source: "check.svg" },
  alertCircle: { source: "alert-circle.svg" },
};

// Cache structure for all websites' stats
interface WebsiteStats {
  stats: StatsResponse | null;
  error: Error | null;
  loading: boolean;
}

interface StatsCache {
  [websiteId: string]: WebsiteStats;
}

// Module-level cache that persists between menu opens
let globalStatsCache: StatsCache = {};
let globalCacheTimeRange: TimeRange | null = null;
let globalIsFetching: boolean = false;
let globalInitialData: {
  websites: Website[];
  activeWebsite: Website | null;
  timeRange: TimeRange;
} | null = null;

// Auto-refresh interval: 1 minute
const AUTO_REFRESH_INTERVAL_MS = 60 * 1000;

async function loadInitialData() {
  const [websites, activeWebsite, timeRange] = await Promise.all([getWebsites(), getActiveWebsite(), getTimeRange()]);
  return { websites, activeWebsite, timeRange };
}

// Track what the stored state was last time we checked
let lastStoredActiveId: string | null = null;
let lastStoredWebsiteCount: number = 0;

export default function MenuBarStats() {
  const preferences = getPreferenceValues<Preferences>();
  const [currentTimeRange, setCurrentTimeRange] = useState<TimeRange | null>(null);
  const [currentWebsite, setCurrentWebsite] = useState<Website | null>(null);
  // Initialize from global cache to persist between menu opens - use function to avoid recreation
  const [statsCache, setStatsCache] = useState<StatsCache>(() => globalStatsCache);

  // Initial data state - initialize from global cache if available
  const [initialData, setInitialData] = useState<{
    websites: Website[];
    activeWebsite: Website | null;
    timeRange: TimeRange;
  } | null>(() => globalInitialData);

  // Only show loading if we have NO cached data at all
  const hasAnyCachedData = Object.keys(globalStatsCache).length > 0 && globalInitialData !== null;
  const [isLoadingInitial, setIsLoadingInitial] = useState(!hasAnyCachedData);

  // Track if we're doing a background refresh (don't show loading indicator)
  const isBackgroundRefresh = useRef(false);

  // Load initial data from storage
  const revalidateInitial = useCallback(async (isBackground = false) => {
    isBackgroundRefresh.current = isBackground;
    const data = await loadInitialData();
    globalInitialData = data;
    setInitialData(data);
    setIsLoadingInitial(false);
    lastStoredActiveId = data.activeWebsite?.id ?? null;
    lastStoredWebsiteCount = data.websites.length;
    return data;
  }, []);

  // Load on mount - only if we don't have cached data
  useEffect(() => {
    if (!globalInitialData) {
      revalidateInitial(false);
    } else {
      // We have cached data, just sync state
      setInitialData(globalInitialData);
      setIsLoadingInitial(false);
      lastStoredActiveId = globalInitialData.activeWebsite?.id ?? null;
      lastStoredWebsiteCount = globalInitialData.websites.length;
    }
  }, [revalidateInitial]);

  // Poll storage every 2 seconds to sync with Manage Websites changes (reduced frequency)
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await loadInitialData();
      const storedActiveId = data.activeWebsite?.id ?? null;
      const websiteCountChanged = data.websites.length !== lastStoredWebsiteCount;
      const activeChanged = storedActiveId !== lastStoredActiveId;

      // Update if storage changed (active website or website list)
      if (activeChanged || websiteCountChanged) {
        globalInitialData = data;
        setInitialData(data);
        if (activeChanged) {
          setCurrentWebsite(null); // Reset local override
        }
        // Sync stats cache state with any new data
        setStatsCache(globalStatsCache);
      }
      lastStoredActiveId = storedActiveId;
      lastStoredWebsiteCount = data.websites.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const websites = initialData?.websites ?? [];
  const activeWebsite = currentWebsite ?? initialData?.activeWebsite ?? null;
  const timeRange = currentTimeRange ?? initialData?.timeRange ?? preferences.defaultTimeRange;

  // Fetch stats for ALL websites in parallel (silently in background)
  const fetchAllWebsites = useCallback(async (sites: Website[], range: TimeRange, isBackgroundFetch = false) => {
    if (sites.length === 0) return;
    if (globalIsFetching) return;

    globalIsFetching = true;
    globalCacheTimeRange = range;

    // For background fetches, DON'T update loading state - keep showing existing stats
    if (!isBackgroundFetch) {
      // Only mark as loading if we don't have existing stats
      const loadingCache: StatsCache = {};
      sites.forEach((site) => {
        const existingStats = globalStatsCache[site.id]?.stats ?? null;
        loadingCache[site.id] = {
          stats: existingStats,
          error: null,
          loading: existingStats === null, // Only show loading if no existing data
        };
      });
      globalStatsCache = loadingCache;
      setStatsCache(loadingCache);
    }

    // Fetch all websites in parallel
    const results = await Promise.allSettled(
      sites.map(async (website) => {
        const data = await fetchStats({
          domain: website.domain,
          apiKey: website.apiKey,
          timeRange: range,
        });
        return { id: website.id, data };
      })
    );

    // Update cache with results
    const updatedCache: StatsCache = {};
    results.forEach((result, index) => {
      const websiteId = sites[index].id;
      if (result.status === "fulfilled") {
        updatedCache[websiteId] = {
          stats: result.value.data,
          error: null,
          loading: false,
        };
      } else {
        // On error, keep existing stats if available
        const existingStats = globalStatsCache[websiteId]?.stats ?? null;
        updatedCache[websiteId] = {
          stats: existingStats,
          error: result.reason instanceof Error ? result.reason : new Error("Failed to fetch"),
          loading: false,
        };
      }
    });

    globalStatsCache = updatedCache;
    setStatsCache(updatedCache);
    globalIsFetching = false;
  }, []);

  // Fetch all websites when list loads or time range changes
  // But skip if we already have cached data for this time range
  useEffect(() => {
    // Wait for initial data to be ready
    if (!initialData || websites.length === 0) return;

    // Check if we have valid cached data for all websites with current time range
    const hasValidCache =
      globalCacheTimeRange === timeRange && websites.every((site) => globalStatsCache[site.id]?.stats != null);

    if (!hasValidCache) {
      fetchAllWebsites(websites, timeRange, false);
    }
  }, [initialData, websites.length, timeRange, fetchAllWebsites]);

  // Auto-refresh every 1 minute (background refresh - no loading indicator)
  useEffect(() => {
    if (!initialData || websites.length === 0) return;

    const interval = setInterval(() => {
      // Only refresh if not currently fetching
      if (!globalIsFetching) {
        fetchAllWebsites(websites, timeRange, true);
      }
    }, AUTO_REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [initialData, websites, timeRange, fetchAllWebsites]);

  // Get current website's stats from cache - INSTANT lookup!
  // First try React state, then fall back to global cache for immediate access
  const currentWebsiteStats = activeWebsite
    ? (statsCache[activeWebsite.id] ?? globalStatsCache[activeWebsite.id])
    : null;
  const stats = currentWebsiteStats?.stats ?? null;
  const error = currentWebsiteStats?.error ?? null;

  // Only show loading if we have NO stats at all (first load ever)
  // Never show loading when we have cached data
  const isLoading = isLoadingInitial && !stats;

  // Switch website - INSTANT because stats are pre-fetched
  const handleSwitchWebsite = useCallback((website: Website) => {
    setCurrentWebsite(website);
    setActiveWebsiteId(website.id); // Save in background
  }, []);

  // Change time range - triggers refetch of all websites
  const handleSetTimeRange = useCallback((range: TimeRange) => {
    setCurrentTimeRange(range);
    saveTimeRange(range); // Save in background
  }, []);

  // Cycle to next website
  const handleCycleWebsite = useCallback(async () => {
    const nextWebsite = await cycleToNextWebsite();
    if (nextWebsite) {
      setCurrentWebsite(nextWebsite);
      showHUD(`Switched to ${nextWebsite.label || nextWebsite.domain}`);
    }
  }, []);

  // Refresh all websites (manual refresh - but still keep showing existing stats)
  const handleRefresh = useCallback(() => {
    revalidateInitial(true);
    if (websites.length > 0) {
      globalIsFetching = false; // Reset to allow refetch
      // Use background fetch to not show loading state
      fetchAllWebsites(websites, timeRange, true);
    }
  }, [revalidateInitial, websites, timeRange, fetchAllWebsites]);

  const handleOpenDashboard = useCallback(() => {
    if (activeWebsite) {
      open(getDashboardUrl(activeWebsite.domain));
    }
  }, [activeWebsite]);

  const handleManageWebsites = useCallback(async () => {
    await launchCommand({ name: "manage-websites", type: LaunchType.UserInitiated });
  }, []);

  // Build display strings
  const title = buildMenuBarTitle(stats, preferences, isLoading, error, activeWebsite);
  const tooltip = buildTooltip(activeWebsite, timeRange, stats);

  // No websites configured
  if (!isLoadingInitial && websites.length === 0) {
    return (
      <MenuBarExtra icon={Icons.chartBar} title="Setup" tooltip="Click to add a website">
        <MenuBarExtra.Item title="No websites configured" />
        <MenuBarExtra.Section>
          <MenuBarExtra.Item
            title="Add Website..."
            icon={Icons.plus}
            shortcut={{ modifiers: ["cmd"], key: "n" }}
            onAction={handleManageWebsites}
          />
        </MenuBarExtra.Section>
      </MenuBarExtra>
    );
  }

  // Never show loading spinner if we have stats - only on first load ever
  const showLoadingIndicator = isLoading;

  return (
    <MenuBarExtra icon={Icons.chartBar} title={title} tooltip={tooltip} isLoading={showLoadingIndicator}>
      <MenuBarExtra.Section>
        <MenuBarExtra.Item
          title={activeWebsite?.label || activeWebsite?.domain || "No website"}
          subtitle={getTimeRangeLabel(timeRange)}
          onAction={handleOpenDashboard}
        />
      </MenuBarExtra.Section>

      {stats && (
        <>
          <MenuBarExtra.Section title="Statistics">
            <MenuBarExtra.Item
              title="Visitors"
              subtitle={formatNumber(stats.visitors)}
              icon={Icons.user}
              onAction={handleOpenDashboard}
            />
            <MenuBarExtra.Item
              title="Pageviews"
              subtitle={formatNumber(stats.pageviews)}
              icon={Icons.eye}
              onAction={handleOpenDashboard}
            />
            {stats.seconds_on_page !== undefined && (
              <MenuBarExtra.Item
                title="Avg. Time on Page"
                subtitle={formatDuration(stats.seconds_on_page)}
                icon={Icons.clock}
                onAction={handleOpenDashboard}
              />
            )}
          </MenuBarExtra.Section>

          {stats.pages && stats.pages.length > 0 && (
            <MenuBarExtra.Section title="Top Pages">
              {stats.pages.slice(0, 5).map((page, index) => (
                <MenuBarExtra.Item
                  key={index}
                  title={truncatePath(page.value)}
                  subtitle={`${formatNumber(page.pageviews)} views`}
                  onAction={() => open(`https://${activeWebsite?.domain}${page.value}`)}
                />
              ))}
            </MenuBarExtra.Section>
          )}

          {stats.referrers && stats.referrers.length > 0 && (
            <MenuBarExtra.Section title="Top Referrers">
              {stats.referrers.slice(0, 5).map((referrer, index) => (
                <MenuBarExtra.Item
                  key={index}
                  title={referrer.value || "Direct"}
                  subtitle={`${formatNumber(referrer.visitors)} visitors`}
                />
              ))}
            </MenuBarExtra.Section>
          )}
        </>
      )}

      {error && !stats && (
        <MenuBarExtra.Section>
          <MenuBarExtra.Item title="Error loading stats" icon={Icons.alertCircle} />
          <MenuBarExtra.Item title={error.message} />
        </MenuBarExtra.Section>
      )}

      <MenuBarExtra.Section>
        <MenuBarExtra.Submenu title="Time Range" icon={Icons.calendar}>
          <MenuBarExtra.Item
            title="Last 24 Hours"
            icon={timeRange === "today" ? Icons.check : undefined}
            onAction={() => handleSetTimeRange("today")}
          />
          <MenuBarExtra.Item
            title="Last 7 Days"
            icon={timeRange === "7d" ? Icons.check : undefined}
            onAction={() => handleSetTimeRange("7d")}
          />
          <MenuBarExtra.Item
            title="Last 30 Days"
            icon={timeRange === "30d" ? Icons.check : undefined}
            onAction={() => handleSetTimeRange("30d")}
          />
        </MenuBarExtra.Submenu>

        {websites.length > 1 && (
          <MenuBarExtra.Submenu title="Switch Website" icon={Icons.globe}>
            {websites.map((website) => (
              <MenuBarExtra.Item
                key={website.id}
                title={website.label || website.domain}
                icon={website.id === activeWebsite?.id ? Icons.check : undefined}
                onAction={() => handleSwitchWebsite(website)}
              />
            ))}
          </MenuBarExtra.Submenu>
        )}
      </MenuBarExtra.Section>

      <MenuBarExtra.Section>
        <MenuBarExtra.Item
          title="Refresh"
          icon={Icons.refresh}
          shortcut={{ modifiers: ["cmd"], key: "r" }}
          onAction={handleRefresh}
        />
      </MenuBarExtra.Section>

      <MenuBarExtra.Section>
        <MenuBarExtra.Item
          title="Open Dashboard"
          icon={Icons.globe}
          shortcut={{ modifiers: ["cmd"], key: "o" }}
          onAction={handleOpenDashboard}
        />
        {websites.length > 1 && (
          <MenuBarExtra.Item
            title="Next Website"
            icon={Icons.arrowRight}
            shortcut={{ modifiers: ["cmd"], key: "." }}
            onAction={handleCycleWebsite}
          />
        )}
        <MenuBarExtra.Item
          title="Manage Websites..."
          icon={Icons.settings}
          shortcut={{ modifiers: ["cmd"], key: "," }}
          onAction={handleManageWebsites}
        />
        <MenuBarExtra.Item title="Preferences..." icon={Icons.settings} onAction={openCommandPreferences} />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}

function buildMenuBarTitle(
  stats: StatsResponse | null | undefined,
  preferences: Preferences,
  isLoading: boolean,
  error: Error | null | undefined,
  activeWebsite: Website | null
): string {
  if (!activeWebsite) {
    return "Setup";
  }

  if (isLoading && !stats) {
    return "...";
  }

  if (error && !stats) {
    return "!";
  }

  if (!stats) {
    return "--";
  }

  const visitors = formatNumber(stats.visitors);
  const pageviews = formatNumber(stats.pageviews);

  switch (preferences.displayMode) {
    case "visitors":
      return visitors;
    case "pageviews":
      return pageviews;
    case "both":
    default:
      return `${visitors} | ${pageviews}`;
  }
}

function buildTooltip(
  activeWebsite: Website | null,
  timeRange: TimeRange,
  stats: StatsResponse | null | undefined
): string {
  if (!activeWebsite) {
    return "Simple Analytics: Click to setup";
  }

  const siteName = activeWebsite.label || activeWebsite.domain;
  const rangeLabel = getTimeRangeLabel(timeRange);

  if (!stats) {
    return `${siteName}: ${rangeLabel}`;
  }

  return `${siteName}: ${rangeLabel}\n${stats.visitors} visitors, ${stats.pageviews} pageviews`;
}
