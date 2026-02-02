import { getPreferenceValues } from "@raycast/api";
import { StatsResponse, TimeRange, Preferences, isValidStatsResponse } from "./types";
import { getDateRange } from "./format";

const BASE_URL = "https://simpleanalytics.com";
const API_WEBSITES_ENDPOINT = `${BASE_URL}/api/websites`;
const API_VERSION = 6;
const DEFAULT_FIELDS = ["pageviews", "visitors", "seconds_on_page", "pages", "referrers"];

interface FetchStatsOptions {
  domain: string;
  timeRange: TimeRange;
  fields?: string[];
  limit?: number;
}

export async function fetchStats(options: FetchStatsOptions): Promise<StatsResponse> {
  const { domain, timeRange, fields = DEFAULT_FIELDS, limit = 5 } = options;
  const { start, end } = getDateRange(timeRange);
  const preferences = getPreferenceValues<Preferences>();

  const params = new URLSearchParams({
    version: API_VERSION.toString(),
    fields: fields.join(","),
    start,
    end,
    limit: limit.toString(),
  });

  const url = `${BASE_URL}/${domain}.json?${params.toString()}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (preferences.apiKey) {
    headers["Api-Key"] = preferences.apiKey;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers,
    });
  } catch (error) {
    throw new Error("Network error. Check your internet connection.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid API key or unauthorized access");
    }
    if (response.status === 404) {
      throw new Error("Website not found. Check the domain name.");
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!isValidStatsResponse(data)) {
    throw new Error("Unexpected API response format");
  }

  return data;
}

export async function testConnection(domain: string): Promise<{ success: boolean; error?: string }> {
  try {
    await fetchStats({
      domain,
      timeRange: "today",
      fields: ["pageviews"],
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function getDashboardUrl(domain: string): string {
  return `${BASE_URL}/${domain}`;
}

/** Minimal interface for website data from Simple Analytics API */
export interface ApiWebsite {
  hostname: string;
}

function isValidApiWebsitesResponse(data: unknown): data is ApiWebsite[] {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(
    (item) => typeof item === "object" && item !== null && typeof (item as ApiWebsite).hostname === "string"
  );
}

export class MissingCredentialsError extends Error {
  constructor() {
    super("API Key and User ID are required. Set them in extension preferences.");
    this.name = "MissingCredentialsError";
  }
}

export async function fetchWebsitesFromAPI(): Promise<ApiWebsite[]> {
  const preferences = getPreferenceValues<Preferences>();

  if (!preferences.apiKey || !preferences.userId) {
    throw new MissingCredentialsError();
  }

  let response: Response;
  try {
    response = await fetch(API_WEBSITES_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": preferences.apiKey,
        "User-Id": preferences.userId,
      },
    });
  } catch (error) {
    throw new Error("Network error. Check your internet connection.");
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid API key or User ID");
    }
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (!isValidApiWebsitesResponse(data)) {
    throw new Error("Unexpected API response format");
  }

  return data;
}
