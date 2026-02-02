/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Menu Bar Display - What statistics to show in the menu bar */
  "displayMode": "visitors" | "pageviews" | "both",
  /** Default Time Range - Default time range for statistics */
  "defaultTimeRange": "today" | "7d" | "30d",
  /** API Key - Your Simple Analytics API key. Find it at simpleanalytics.com/account */
  "apiKey"?: string,
  /** User ID - Your Simple Analytics User ID. Required for importing websites. Find it at simpleanalytics.com/account */
  "userId"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `menu-bar-stats` command */
  export type MenuBarStats = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-websites` command */
  export type ManageWebsites = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `menu-bar-stats` command */
  export type MenuBarStats = {}
  /** Arguments passed to the `manage-websites` command */
  export type ManageWebsites = {}
}

