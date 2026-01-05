### Configure Netlify Redirects for Simple Analytics Proxy

Source: https://docs.simpleanalytics.com/proxy

This example illustrates how to set up proxying for Simple Analytics using Netlify's `_redirects` file. It defines 200-status redirects for `proxy.js`, `auto-events.js`, and the `/simple/*` path to their respective Simple Analytics CDN endpoints. Ensure `example.com` is updated to your domain.

```Netlify Redirects
/proxy.js https://simpleanalyticsexternal.com/proxy.js?hostname=example.com&path=/simple 200
/auto-events.js https://scripts.simpleanalyticscdn.com/auto-events.js 200
/simple/* https://queue.simpleanalyticscdn.com/:splat 200
```

---

### Update Simple Analytics Embed Script with Optional Noscript Tag for Proxy

Source: https://docs.simpleanalytics.com/proxy

This example provides the full embed script, including an optional `<noscript>` tag, for use with the Simple Analytics proxy. It's important to note the `/simple` prefix for `noscript.gif` and its absence for `proxy.js` in the main script tag.

```HTML
<script async src="https://example.com/proxy.js"></script>
<noscript
  ><img
    src="https://example.com/simple/noscript.gif"
    alt=""
    referrerpolicy="no-referrer-when-downgrade"
/></noscript>
```

---

### Gatsby Simple Analytics Plugin Advanced Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gatsby

This configuration example demonstrates how to set a custom domain, enable event tracking, and specify pages to ignore for the Simple Analytics Gatsby plugin.

```JavaScript
plugins: [
  {
    resolve: "gatsby-plugin-simple-analytics",
    options: {
      domain: "custom.example.com",
      eventsGlobal: "sa",
      events: true,
      trackPageViews: true,
      ignorePages: ["pathname"],
    },
  },
]
```

---

### Install Simple Analytics via npm

Source: https://docs.simpleanalytics.com/install-simple-analytics-via-analytics-package

This command installs the core 'analytics' library and the specific '@analytics/simple-analytics' plugin using npm, the package manager for JavaScript. This setup allows for easy integration and customization of analytics tracking.

```JavaScript
npm install analytics @analytics/simple-analytics
```

---

### Configure Caddy Proxy for Simple Analytics Resources

Source: https://docs.simpleanalytics.com/proxy

This Caddyfile configuration shows how to proxy Simple Analytics resources using Caddy. It defines `handle` blocks for `proxy.js`, `auto-events.js`, and the analytics queue, including stripping prefixes and managing `X-Forwarded-For` headers. Update `example.com` to your actual domain.

```Caddyfile
example.com {
  handle /simple/* {
    uri strip_prefix /simple
    reverse_proxy https://queue.simpleanalyticscdn.com {
      header_up X-Caddy-Proxy "true"
      header_up -X-Forwarded-For
    }
  }
  handle /proxy.js {
    rewrite * /proxy.js?{query}&hostname=example.com&path=/simple
    reverse_proxy https://simpleanalyticsexternal.com {
      header_up -X-Forwarded-For
    }
  }
  handle /auto-events.js {
    rewrite * /auto-events.js
    reverse_proxy https://scripts.simpleanalyticscdn.com {
      header_up -X-Forwarded-For
    }
  }
}
```

---

### Configure Simple Analytics VuePress Plugin with Advanced Options

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vuepress

Example configuration for the Simple Analytics plugin in VuePress, demonstrating how to set a custom domain for bypassing ad-blockers, define the global events object for custom event tracking, and enable tracking for Do Not Track (DNT) users.

```JavaScript
module.exports = {
  plugins: [
    [
      "vuepress-plugin-simple-analytics",
      {
        customDomain: "data.example.com", // You custom domain
        eventsGlobal: "sa", // The global events object for sa("click_button")
        skipDnt: true // When set to true you track the DNT users
      }
    ]
  ]
};
```

---

### Configure NGINX Proxy for Simple Analytics Resources

Source: https://docs.simpleanalytics.com/proxy

This snippet demonstrates how to set up NGINX as a reverse proxy for Simple Analytics. It configures specific `location` blocks to proxy `proxy.js`, `auto-events.js`, and the main analytics queue, ensuring proper header forwarding and handling of trailing slashes. Remember to replace `example.com` with your domain.

```NGINX
location ^~ /simple/ {
  proxy_set_header  X-Forwarded-Proto $scheme;
  proxy_set_header  X-Forwarded-Proto-Version $http2;
  proxy_set_header  Host $http_host;
  proxy_set_header  X-NginX-Proxy true;
  proxy_set_header  Connection "";
  proxy_pass_request_headers on;
  proxy_pass https://queue.simpleanalyticscdn.com/;
}

location = /proxy.js {
  expires 7d;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  proxy_pass https://simpleanalyticsexternal.com/proxy.js?hostname=example.com&path=/simple;
}

location = /auto-events.js {
  expires 7d;
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  proxy_pass https://scripts.simpleanalyticscdn.com/auto-events.js;
}
```

---

### Configure Vercel Rewrites for Simple Analytics Proxy

Source: https://docs.simpleanalytics.com/proxy

This `vercel.json` configuration demonstrates how to implement proxy rewrites for Simple Analytics resources on Vercel. It uses `source` and `destination` properties to redirect requests for `proxy.js`, `auto-events.js`, and `/simple/*` to the Simple Analytics CDNs. Remember to customize `example.com` and the `/simple` path as needed.

```JSON
{
  "rewrites": [
    {
      "source": "/proxy.js",
      "destination": "https://simpleanalyticsexternal.com/proxy.js?hostname=example.com&path=/simple"
    },
    {
      "source": "/auto-events.js",
      "destination": "https://scripts.simpleanalyticscdn.com/auto-events.js"
    },
    {
      "source": "/simple/:match*",
      "destination": "https://queue.simpleanalyticscdn.com/:match*"
    }
  ]
}
```

---

### Basic Simple Analytics Plugin Setup for Nuxt 3

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This code snippet demonstrates the fundamental setup for integrating Simple Analytics into a Nuxt 3 application. It creates a client-side plugin that registers the `simple-analytics-vue` library with the Nuxt Vue application instance, enabling basic analytics tracking.

```javascript
import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SimpleAnalytics);
});
```

---

### Install Simple Analytics Python package

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-django

Command to install the Simple Analytics Python package using pip, which is the standard package installer for Python.

```bash
pip install simpleanalytics
```

---

### Manually Install Simple Analytics Rails Gem

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-ruby-on-rails

Alternatively, you can install the `simple_analytics_rails` gem directly from the command line using `gem install`. This is useful for global installation or testing outside of a Bundler-managed project.

```Ruby
gem install simple_analytics_rails
```

---

### Integrate Simple Analytics tags into Django template

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-django

Example of a Django HTML template demonstrating how to load and use Simple Analytics template tags (`simpleanalytics_sync` for JavaScript tracking and `simpleanalytics_noscript_block` for fallback) within your HTML structure.

```django-html
<!DOCTYPE html>
{% load static simpleanalytics_tags %}
<html>
  <head>
    <meta charset="utf-8" />
    <title>{% block page_title %}{% endblock %}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    ... {% simpleanalytics_sync %} ...
  </head>
  <body>
    {% simpleanalytics_noscript_block %}
  </body>
</html>
```

---

### Install Simple Analytics VuePress Plugin

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vuepress

Command to install the Simple Analytics plugin for VuePress using npm, saving it as a development dependency.

```Shell
npm install vuepress-plugin-simple-analytics --save-dev
```

---

### Install Ruby Gems with Bundler

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-ruby-on-rails

After adding the gem to your Gemfile, run `bundle install` in your terminal. This command resolves and installs all declared gems, including `simple_analytics_rails`, into your project's environment.

```Ruby
bundle install
```

---

### Nuxt.js: Simple Analytics Vue Plugin Setup

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

Illustrates the creation of a `simple-analytics.js` plugin file for Nuxt.js. It imports the `simple-analytics-vue` library and registers it with Vue, conditionally skipping tracking outside of production environments to prevent local development data from being sent.

```javascript
import SimpleAnalytics from "simple-analytics-vue";
import Vue from "vue";

Vue.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== "production" });
```

---

### Simple Analytics Stats API: Wildcard Search for Paths Starting With

Source: https://docs.simpleanalytics.com/api/stats

API call example demonstrating the use of wildcards ('\*') to search for pages whose paths start with a specific string. This allows for flexible querying of data for groups of related pages.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=pages&pages=/web*
```

---

### Combined Simple Analytics Embed and Automated Events Scripts with Proxy

Source: https://docs.simpleanalytics.com/proxy

This code block presents the complete set of HTML script tags required to integrate Simple Analytics with both its main embed and automated events features, all routed through your custom proxy endpoints. It combines the `proxy.js` and `auto-events.js` script references.

```HTML
<script async src="https://example.com/proxy.js"></script>
<script async src="https://example.com/auto-events.js"></script>
```

---

### Install Gridsome Simple Analytics Plugin

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gridsome

Installs the `gridsome-plugin-simple-analytics` package using npm, adding it to your Gridsome project's dependencies.

```Node.js
npm install gridsome-plugin-simple-analytics
```

---

### Simple Analytics Embed Script Header

Source: https://docs.simpleanalytics.com/proxy

This snippet shows the expected header comment of the Simple Analytics embed script, which should be returned when accessing the proxy.js file. It indicates the script's privacy-friendly nature.

```JavaScript
/* Simple Analytics - Privacy friendly analytics ... */
```

---

### Example CloudQuery Sync Output

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Illustrates the successful output of a CloudQuery sync operation, showing migration and sync completion, resource count, and execution time.

```bash
➜ playground cloudquery sync simpleanalytics.yml sqlite.yml
Loading spec(s) from simple-analytics.yml
Starting migration with 2 tables for: simple-analytics (v1.0.0) -> [sqlite (v1.2.1)]
Migration completed successfully.
Starting sync for: simple-analytics (v1.0.0) -> [sqlite (v1.2.1)]
Sync completed successfully. Resources: 105666, Errors: 0, Panics: 0, Time: 41s
```

---

### Initialize Analytics Library with Simple Analytics Plugin (JavaScript)

Source: https://docs.simpleanalytics.com/install-simple-analytics-via-analytics-package

This snippet demonstrates how to import and initialize the Analytics library with the Simple Analytics plugin. It sets up automatic page view tracking for your application.

```javascript
/* src/analytics.js */
import Analytics from "analytics";
import simpleAnalyticsPlugin from "@analytics/simple-analytics";

const analytics = Analytics({
  app: "awesome-app",
  plugins: [
    // Load simple analytics! 🎉
    simpleAnalyticsPlugin(),
  ],
});

/* All page views are now tracked by simple analytics */
```

---

### Install Simple Analytics Inline Events Helper Script

Source: https://docs.simpleanalytics.com/events/inline

Include these script tags before the closing </body> tag to enable automatic event tracking based on data-simple-event attributes. This installs both the main Simple Analytics script and the inline events helper.

```HTML
<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<script async src="https://scripts.simpleanalyticscdn.com/inline-events.js"></script>
```

---

### Begin Simple Analytics Rails Gem Initializer Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-ruby-on-rails

The `simple_analytics_rails` gem allows for custom configuration via an initializer file. This snippet indicates where such a configuration block would begin, enabling advanced settings for the tracking script.

```Ruby

```

---

### Install Simple Analytics Docusaurus Plugin via npm

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-docusaurus

This command installs the docusaurus-plugin-simple-analytics package from npm, adding it as a dependency to your Docusaurus project. This is the first step to integrate Simple Analytics.

```Shell
npm install docusaurus-plugin-simple-analytics --save
```

---

### Configure Simple Analytics Skip Option with Function or Promise

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

This example shows a more advanced usage of the 'skip' option, allowing a function or a promise to determine when Simple Analytics should be skipped. This is useful for dynamic conditions, such as skipping tracking based on user authentication status or other asynchronous checks.

```JavaScript
import auth from "lib/auth";
Vue.use(SimpleAnalytics, { skip: auth.isAdminPromise });
```

---

### Add Simple Analytics to Django INSTALLED_APPS

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-django

Configuration snippet for Django's settings.py file to include the 'simpleanalytics' app in your project, making its functionalities available.

```python
INSTALLED_APPS = [
   ...,
   simpleanalytics,
]
```

---

### Example URL with Simple Analytics UTM Parameters

Source: https://docs.simpleanalytics.com/how-to-use-url-parameters

A sample URL demonstrating the use of `utm_source`, `utm_medium`, `utm_campaign`, and a custom `project-id` parameter for tracking purposes within Simple Analytics. This URL shows how marketing campaign data is appended to a landing page link.

```URL
https://example.com/landing-page?utm_source=company-x&utm_medium=newsletter&utm_campaign=march_01&project-id=123
```

---

### Install Simple Analytics Vue.js Package

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

This command installs the official Simple Analytics plugin for Vue.js using npm, making it available for use in your project.

```bash
npm install simple-analytics-vue
```

---

### Install Simple Analytics via JavaScript

Source: https://docs.simpleanalytics.com/script

This JavaScript code dynamically creates a script element and appends it to the document's head, loading the Simple Analytics tracking script. This method is suitable when direct HTML embedding is not feasible, allowing for programmatic installation.

```JavaScript
// Simple Analytics - 100% privacy-first analytics
const script = document.createElement("script");
script.setAttribute("src", "https://scripts.simpleanalyticscdn.com/latest.js");
document.head.appendChild(script);
```

---

### Install Gatsby Simple Analytics Plugin via npm

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gatsby

Use this npm command to add the `gatsby-plugin-simple-analytics` package as a development dependency to your Gatsby project.

```Shell
npm install gatsby-plugin-simple-analytics --save-dev
```

---

### Example Original User-Agent String

Source: https://docs.simpleanalytics.com/metrics

This snippet provides an example of an original user-agent string as reported by a browser or device. User-agent strings are used by browsers or devices to identify themselves to websites, typically containing information about the browser, operating system, and device type.

```text
Mozilla/5.0 (iPad; U; CPU OS 3_2_1) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B40598
```

---

### Install Simple Analytics Vue Package

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

Command to install the `simple-analytics-vue` package, which provides Vue.js and Nuxt.js integration for Simple Analytics, as a development dependency.

```npm
npm install simple-analytics-vue --save-dev
```

---

### Configure Simple Analytics Plugin in Gridsome

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gridsome

Configures the `gridsome-plugin-simple-analytics` in your Gridsome project's `gridsome.config.js` file, enabling basic Simple Analytics tracking.

```JavaScript
module.exports = {
  plugins: [
    {
      use: "gridsome-plugin-simple-analytics",
    },
  ],
};
```

---

### Update Simple Analytics Embed Script to Use Proxy Endpoint

Source: https://docs.simpleanalytics.com/proxy

This snippet shows the basic modification required for the Simple Analytics embed script. It changes the `src` attribute of the `<script>` tag to point to your self-hosted `proxy.js` endpoint, ensuring all analytics traffic goes through your proxy.

```HTML
<script async src="https://example.com/proxy.js"></script>
```

---

### Register Simple Analytics Plugin in Docusaurus Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-docusaurus

After installation, add the docusaurus-plugin-simple-analytics to the plugins array within your docusaurus.config.js file. This activates the plugin for your Docusaurus site.

```JavaScript
plugins: [
  ...
  ['docusaurus-plugin-simple-analytics', {}],
  ...
],
```

---

### Update Simple Analytics Automated Events Script to Use Proxy Endpoint

Source: https://docs.simpleanalytics.com/proxy

This snippet demonstrates how to modify the script tag for Simple Analytics' automated events. It updates the `src` attribute to point to your proxied `auto-events.js` endpoint, ensuring event tracking also goes through your custom proxy.

```HTML
<script async src="https://example.com/auto-events.js"></script>
```

---

### Basic Gatsby Simple Analytics Plugin Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gatsby

Add this configuration block to your `gatsby-config.js` file to enable basic page view tracking with the Simple Analytics plugin.

```JavaScript
plugins: [
  {
    resolve: "gatsby-plugin-simple-analytics",
    options: {
      trackPageViews: true,
    },
  },
]
```

---

### Add Simple Analytics Plugin to VuePress Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vuepress

Configuration snippet to enable the Simple Analytics plugin in your VuePress `config.js` file, allowing it to be used in your project.

```JavaScript
module.exports = {
  plugins: ["vuepress-plugin-simple-analytics"],
};
```

---

### Install Simple Analytics Vue Package for Nuxt 2

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This command installs the `simple-analytics-vue` package, a Vue.js integration for Simple Analytics, as a development dependency using npm. It's the first step to integrate analytics into a Nuxt 2 project.

```bash
npm install simple-analytics-vue@2.x --save-dev
```

---

### Configure Simple Analytics Rails Gem

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-ruby-on-rails

This Ruby code snippet shows how to set up the Simple Analytics Rails gem within a `config/initializers/simple_analytics.rb` file. It covers essential configuration parameters such as the tracking hostname, hash mode, Do Not Track (DNT) collection, pages to exclude from tracking, custom JavaScript global variable, automatic page view collection, a JavaScript callback function for onload events, a custom domain for bypassing ad blockers, and conditional enabling based on the Rails environment.

```Ruby
SimpleAnalyticsRails.configure do |configuration|
  # ==> Overwrite domain name
  # https://docs.simpleanalytics.com/overwrite-domain-name
  #
  # Default is ""
  configuration.hostname = "example.com"
  # ==> Hash mode
  # https://docs.simpleanalytics.com/hash-mode
  #
  # Default is ""
  configuration.mode = "hash"
  # ==> Do not track
  # https://docs.simpleanalytics.com/dnt
  #
  # Default is false
  configuration.collect_dnt = false
  # ==> Ignore pages
  # https://docs.simpleanalytics.com/ignore-pages
  #
  # Default is ""
  configuration.ignore_pages = "/search/*,/account/*,/vouchers"
  # ==> Override variable used for JavaScript Events
  # https://docs.simpleanalytics.com/events#the-variable-sa_event-is-already-used
  #
  # Default is "sa_event"
  configuration.sa_global = "sa_event"
  # ==> Trigger custom page views
  # https://docs.simpleanalytics.com/trigger-custom-page-views#use-custom-collection-anyway
  #
  # Default is true
  configuration.auto_collect = true
  # ==> Onload Callback
  # https://docs.simpleanalytics.com/trigger-custom-page-views#use-custom-collection-anyway
  #
  # Default is ""
  configuration.onload_callback = "onloadCallback()"
  # ==> Custom Domain
  # https://docs.simpleanalytics.com/bypass-ad-blockers
  #
  # Default is ""
  configuration.custom_domain = "custom.domain.com"
  # ==> Inject JavaScript To Head
  # You can disable the automatic JavaScript injection if you'd like.
  #
  # Default is true
  configuration.enabled = Rails.env.production?
end
```

---

### Include Non-JavaScript Fallback for Simple Analytics (HTML)

Source: https://docs.simpleanalytics.com/install-simple-analytics-via-analytics-package

This HTML snippet provides a fallback image tag for browsers with JavaScript disabled, ensuring basic tracking for Simple Analytics.

```html
<noscript
  ><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade"
/></noscript>
```

---

### Example `curl` command to list websites via Admin API

Source: https://docs.simpleanalytics.com/api/admin

This `curl` command demonstrates how to make an authenticated request to the Simple Analytics Admin API's `/api/websites` endpoint to retrieve a list of all associated websites. Replace placeholder values for `Api-Key` and `User-Id` with your actual credentials found in your account settings.

```bash
curl "https://simpleanalytics.com/api/websites" \
     -H 'Content-Type: application/json' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
     -H 'User-Id: sa_user_id_00000000-0000-0000-0000-000000000000'
```

---

### Ignore a single page with Simple Analytics script

Source: https://docs.simpleanalytics.com/ignore-pages

This snippet demonstrates how to configure the Simple Analytics tracking script to ignore a single specific page by providing its path to the `data-ignore-pages` attribute. The path should start with a slash and exclude the domain name, for example, `/vouchers` for `https://example.com/vouchers`.

```HTML
<script
  data-ignore-pages="/vouchers"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Configure Simple Analytics Plugin with Custom Domain in Gridsome

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-gridsome

Configures the `gridsome-plugin-simple-analytics` in Gridsome to use a custom domain for bypassing ad blockers, by setting the `domain` option within the plugin's configuration.

```JavaScript
module.exports = {
  plugins: [
    {
      use: "gridsome-plugin-simple-analytics",
      options: {
        domain: "api.example.com",
      },
    },
  ],
};
```

---

### Example CSV output format for Simple Analytics data export

Source: https://docs.simpleanalytics.com/api/export-data-points

This shows the structure and example data of the CSV output when exporting data from Simple Analytics. It includes fields like `added_iso`, `country_code`, `path`, and `session_id`.

```csv
added_iso,country_code,datapoint,device_type,path,session_id,utm_campaign,utm_content,utm_medium,utm_source
2025-07-03T20:13:19.100Z,US,visit_homepage,desktop,/,1e5aad53-c734-40ac-b060-426a70d1c104,ads1,,,duckduckgo
2025-07-04T18:39:04.100Z,UK,visit_homepage,desktop,/,7b03aa29-612d-4aa8-b147-72c13986c4ae,,,newsletter,
2025-07-04T18:43:04.200Z,UK,popup_show,desktop,/,7b03aa29-612d-4aa8-b147-72c13986c4ae,,,,
2025-07-04T19:21:09.100Z,NL,visit_homepage,desktop,/,928e4f2f-1f16-4900-9ad8-0a1965e689a3,,,,google
2025-07-04T19:21:29.200Z,NL,popup_show,desktop,/,928e4f2f-1f16-4900-9ad8-0a1965e689a3,,,,
2025-07-04T19:21:59.300Z,NL,popup_close,desktop,/,928e4f2f-1f16-4900-9ad8-0a1965e689a3,,,,
```

---

### Simple Analytics Stats API: Retrieve Data for Specific Pages using 'pages' Parameter

Source: https://docs.simpleanalytics.com/api/stats

Example API call demonstrating how to retrieve analytics data for a specific page using the 'pages' query parameter. This method allows specifying a single page path to get its associated statistics.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=histogram&pages=/contact
```

---

### Example API Request with Date Placeholders and Time Zone

Source: https://docs.simpleanalytics.com/api/helpers

Demonstrates how to construct a Simple Analytics API request using date placeholders ('yesterday', 'today') and specifying a time zone ('UTC') to fetch histogram data for a specific period.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=histogram&start=yesterday&end=today&timezone=UTC
```

---

### Example HTML structure for a basic link

Source: https://docs.simpleanalytics.com/events/custom-link-clicks

This HTML snippet demonstrates a standard paragraph containing a hyperlink. It serves as the base structure before applying any custom event tracking attributes for Simple Analytics.

```HTML
<p>This is <a href="/">a link</a>.</p>
```

---

### Add Simple Analytics Rails Gem to Gemfile

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-ruby-on-rails

To include the `simple_analytics_rails` gem in your Ruby on Rails project, add this line to your application's Gemfile. This declares the gem as a dependency for your project.

```Ruby
gem 'simple_analytics_rails'
```

---

### Simple Analytics Server-side Event JSON Payload Example

Source: https://docs.simpleanalytics.com/events/server-side

Example JSON structure required for submitting event data to the Simple Analytics server-side endpoint. Includes mandatory fields like type, hostname, event name, and user agent.

```JSON
{
  "type": "event",
  "hostname": "example.com",
  "event": "event-name",
  "ua": "User Agent"
}

```

---

### Example UTM-tagged URL

Source: https://docs.simpleanalytics.com/metrics

This snippet shows a sample URL with UTM parameters appended. UTM codes are bits of text added to links that help analytics tools like Simple Analytics track the source, medium, and campaign of traffic, providing insights into marketing efforts.

```text
https://example.com/landing-page?utm_source=company-x&utm_medium=newsletter&utm_campaign=march
```

---

### Rendered Simple Analytics HTML output

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-django

This HTML snippet shows the final output after Django template tags are processed, illustrating how the Simple Analytics JavaScript tracking code and the noscript fallback image are embedded in the page.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>example.com</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    ...
    <script type="text/javascript" src="https://cdn.simpleanalytics.io/hello.js"></script>
    ...
  </head>
  <body>
    <noscript><img src="https://api.simpleanalytics.io/hello.gif" alt="hello" /></noscript>
  </body>
</html>
```

---

### Send Simple Analytics Events with JavaScript

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-next

This JavaScript function provides a safe way to send custom events to Simple Analytics. It checks for the existence of `window.sa_event` before attempting to call it, preventing errors if the analytics script hasn't loaded or is blocked.

```javascript
export const saEvent = (eventName) => {
  if (window && window.sa_event) return window.sa_event(eventName);
};
```

---

### Access Simple Analytics Data with jQuery using JSONP and CORS

Source: https://docs.simpleanalytics.com/api/cors-jsonp

This snippet demonstrates how to fetch data from Simple Analytics using jQuery's AJAX function, showcasing both JSONP for cross-domain requests and standard CORS. The JSONP example uses a `callback=?` parameter, while the CORS example relies on the `Access-Control-Allow-Origin` header set by the Simple Analytics server.

```JavaScript
$.ajax({
  url: "https://simpleanalytics.com/simpleanalytics.com.json?callback=?",
  dataType: "jsonp",
  success: function (data) {
    console.log(data);
  }
});
```

```JavaScript
$.ajax({
  url: "https://simpleanalytics.com/simpleanalytics.com.json",
  success: function (data) {
    console.log(data);
  }
});
```

---

### Nuxt.js: Configure Simple Analytics Plugin in nuxt.config.js

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

Shows how to include the Simple Analytics plugin in `nuxt.config.js`. The `ssr: false` option is crucial as it ensures the plugin runs only on the client-side, which is essential for client-side analytics libraries that interact with the browser DOM.

```javascript
export default {
  plugins: [{ src: "~/plugins/simple-analytics.js", ssr: false }],
};
```

---

### Embed Simple Analytics JavaScript on GoDaddy Sites

Source: https://docs.simpleanalytics.com/install-simple-analytics-on-godaddy

This JavaScript snippet, embedded within an HTML script tag, is designed for GoDaddy websites to initialize the Simple Analytics tracking. It dynamically sets the website's hostname and the specific page path, allowing for accurate analytics collection. Users must customize the 'hostname' and 'path' variables to match their site and individual pages.

```JavaScript
<script type="text/javascript">
// Simple Analytics script for GoDaddy Sites
// Fill in your hostname and the path for every page on your GoDaddy site
// If your page is https://example.com/ then the hostname is "example.com" and the path is "/"
// If your page is https://example.com/blog then the hostname is "example.com" and the path is "/blog"
var hostname = "yoursite.godaddysites.com";
var path = "/";

// Do not change anything below this line
function goDaddyPathOverwriter() { return path; }

var script = document.createElement("script");
script.src = "https://scripts.simpleanalyticscdn.com/latest.js";
script.setAttribute("data-hostname", hostname);
script.setAttribute("data-path-overwriter", "goDaddyPathOverwriter");
document.head.appendChild(script);
</script>
```

---

### Configure Custom Tracking Domain for Simple Analytics Docusaurus Plugin

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-docusaurus

To use a custom domain for Simple Analytics tracking, which can help bypass ad-blockers, specify the domain option within the plugin configuration in docusaurus.config.js. Replace 'custom.domain.com' with your actual custom domain.

```JavaScript
plugins: [
  ...
  ['docusaurus-plugin-simple-analytics', {
    domain: 'custom.domain.com'
  }],
  ...
],
```

---

### Register Simple Analytics Plugin in Nuxt 2 Configuration

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This snippet modifies `nuxt.config.js` to register the `simple-analytics.js` plugin. By setting `ssr: false`, it ensures the plugin is only executed on the client-side, which is crucial for browser-based analytics libraries.

```javascript
// nuxt.config.js

export default {
  plugins: [{ src: "~/plugins/simple-analytics.js", ssr: false }],
};
```

---

### Example Cleaned User-Agent String

Source: https://docs.simpleanalytics.com/metrics

This snippet shows a user-agent string after Simple Analytics has processed it. For privacy reasons, Simple Analytics replaces long numbers within the user-agent string with zeros, ensuring that specific device identifiers are not retained.

```text
Mozilla/5.0 (iPad; U; CPU OS 3_2_0) AppleWebKit/531.21.0 (KHTML, like Gecko) Mobile/7B40000
```

---

### HTML example with data-sa-link-event attribute for tracking

Source: https://docs.simpleanalytics.com/events/custom-link-clicks

This HTML snippet shows how to apply the 'data-sa-link-event' attribute to a hyperlink. The value of this attribute, 'link_name_text' in this example, will be used as the event name when the JavaScript helper tracks the link click, allowing for custom event naming.

```HTML
<p>This is <a href="/" data-sa-link-event="link_name_text">a link</a>.</p>
```

---

### Vue.js: Send Custom Events with saEvent

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

Demonstrates how to send custom events using the globally available `saEvent` method within a Vue.js component's methods. Events are logged to the console for debugging when not in a production environment.

```javascript
{
  methods: {
    likeComment (comment) {
      // code to like comment
      this.saEvent(`comment_like_${comment.id}`)
    }
  }
}
```

---

### Initialize Simple Analytics in Vue.js with Conditional Skip

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

This snippet demonstrates how to import and register the Simple Analytics plugin with Vue.js. It utilizes the 'skip' option to conditionally disable tracking, typically used to prevent data collection during development by checking the Node.js environment.

```JavaScript
import SimpleAnalytics from "simple-analytics-vue";
import Vue from "vue";

Vue.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== "production" });
```

---

### Simple Analytics Admin API: List Websites Endpoint

Source: https://docs.simpleanalytics.com/api/admin

Defines the HTTP GET endpoint for retrieving a list of all websites associated with a Simple Analytics user account. This is the only Admin API endpoint available for all plans and requires specific authentication headers.

```APIDOC
GET https://simpleanalytics.com/api/websites

Headers:
  Content-Type: application/json
  Api-Key: string (required, from account settings)
  User-Id: string (required, from account settings)

Returns: List of websites for the user.
```

---

### Nuxt 3 Plugin Configuration: Skip Tracking in Development

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This configuration extends the basic Simple Analytics plugin for Nuxt 3 by adding an option to skip tracking when the application is running in a non-production environment. This is useful for preventing development traffic from skewing analytics data.

```javascript
import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SimpleAnalytics, {
    skip: process.env.NODE_ENV !== "production",
  });
});
```

---

### Add Simple Analytics Script to Next.js Pages Router

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-next

This JavaScript snippet illustrates how to integrate the Simple Analytics tracking script into a Next.js application using the Pages Router. The `Script` component from `next/script` is added to the `_app.js` file, ensuring the analytics script is loaded across all pages in the application.

```JavaScript
// pages/_app.js
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  )
}
```

---

### Collect Page Views with Pixel (Basic)

Source: https://docs.simpleanalytics.com/without-javascript

Demonstrates how to use an HTML `<img>` tag to send page view data to Simple Analytics without JavaScript. This example includes `timezone` and `unique` parameters to customize the collected information.

```HTML
<img
  src="https://queue.simpleanalyticscdn.com/noscript.gif?timezone=Europe%2FAmsterdam&unique=false"
  referrerpolicy="no-referrer-when-downgrade"
  alt=""
/>
```

---

### Integrate Simple Analytics Script in Next.js \_app.tsx

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-next

This snippet demonstrates how to add the Simple Analytics script to a Next.js application using `next/script` in `_app.tsx` for versions prior to Next.js 13. It uses the `afterInteractive` strategy for optimal loading and includes a `noscript` fallback for users with JavaScript disabled.

```tsx
import type { AppProps } from "next/app";
import React from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </React.Fragment>
  );
}

export default MyApp;
```

---

### Add Simple Analytics Script to Next.js App Router

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-next

This JavaScript snippet demonstrates how to embed the Simple Analytics tracking script into a Next.js application using the App Router. The `Script` component from `next/script` is placed within the `RootLayout` component, ensuring the analytics script loads globally for all pages.

```JavaScript
// app/layout.js
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  )
}
```

---

### Configure Simple Analytics with Custom Domain in Vue.js

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-vue

This snippet illustrates how to specify a custom domain for Simple Analytics tracking within your Vue.js application. Using a custom domain can help in bypassing ad blockers, ensuring more reliable data collection.

```JavaScript
Vue.use(SimpleAnalytics, { domain: "api.example.com" });
```

---

### Define Simple Analytics Vue Plugin in Nuxt 2

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This JavaScript code defines a Nuxt.js plugin (`~/plugins/simple-analytics.js`) that imports and registers the `simple-analytics-vue` library with Vue. It conditionally skips analytics tracking in non-production environments, ensuring data is only sent from live deployments.

```javascript
// ~/plugins/simple-analytics.js

import SimpleAnalytics from "simple-analytics-vue";
import Vue from "vue";

Vue.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== "production" });
```

---

### Add Custom Metadata to Simple Analytics Events via HTML

Source: https://docs.simpleanalytics.com/events/inline

Any HTML attribute on an element that starts with `data-simple-event-` will be automatically included as custom metadata with the event. Dashes within these attribute names will be converted to underscores in the resulting metadata keys.

```HTML
<button
  data-simple-event="select_plan"
  data-simple-event-plan="enterprise"
  data-simple-event-referrer="homepage"
>
  Choose Enterprise
</button>
```

---

### Nuxt 3 Plugin Configuration: Custom Domain for Ad-Blocker Bypass

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-nuxt

This advanced configuration for the Simple Analytics Nuxt 3 plugin allows specifying a custom domain for data collection. This is primarily used to bypass ad-blockers by routing analytics requests through a domain you control, while also retaining the development skip functionality.

```javascript
import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SimpleAnalytics, {
    skip: process.env.NODE_ENV !== "production",
    domain: "api.example.com",
  });
});
```

---

### Send Simple Analytics Events with TypeScript

Source: https://docs.simpleanalytics.com/install-simple-analytics-with-next

This TypeScript snippet defines a type declaration for `sa_event` and provides a type-safe function to send custom events to Simple Analytics. It ensures type checking for the event name and safely calls the analytics function if available.

```typescript
declare function sa_event(eventName: string);

export const saEvent = (eventName: string) => {
  if (window && window.sa_event) return window.sa_event(eventName);
};
```

---

### Simple Analytics API Authentication Requirements

Source: https://docs.simpleanalytics.com/api/export-data-points

This section outlines the authentication requirements for accessing the Simple Analytics API. API requests must include `Api-Key` and `User-Id` headers, which start with specific prefixes, to ensure secure access to data.

```APIDOC
Authentication Method: Header-based
Required Headers:
  Api-Key: Must start with `sa_api_key_...`
  User-Id: Must start with `sa_user_id_...`
```

---

### Simple Analytics Stats API: Requesting 'seconds_on_page' Field

Source: https://docs.simpleanalytics.com/api/stats

API request example demonstrating how to include the 'seconds_on_page' field along with other fields like 'pages' to retrieve median time on page data. This field provides insights into user engagement.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=pages,seconds_on_page&pages=/,/contact
```

---

### HTML Meta Tag for Content-Security-Policy

Source: https://docs.simpleanalytics.com/csp

Example of configuring Content-Security-Policy (CSP) using an HTML <meta> tag. This policy allows scripts from 'self', 'unsafe-inline', and Simple Analytics CDN, connections to Simple Analytics queue, and images from 'self', Simple Analytics queue, and badges.simpleanalytics.com. The 'unsafe-inline' directive is required for automated event tracking.

```HTML
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://scripts.simpleanalyticscdn.com; connect-src 'self' https://queue.simpleanalyticscdn.com; img-src 'self' https://queue.simpleanalyticscdn.com https://simpleanalyticsbadges.com;">
```

---

### Ignore multiple pages with Simple Analytics script

Source: https://docs.simpleanalytics.com/ignore-pages

This snippet shows how to ignore multiple pages from tracking by providing a comma-separated list of page paths to the `data-ignore-pages` attribute. Each path must start with a slash and represent the part of the URL after the domain name, such as `/search/contact,/accounts/@adriaan,/vouchers`.

```HTML
<script
  data-ignore-pages="/search/contact,/accounts/@adriaan,/vouchers"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Configure Simple Analytics Script with data-hostname

Source: https://docs.simpleanalytics.com/overwrite-domain-name

This snippet demonstrates how to include the Simple Analytics script and use the `data-hostname` attribute to specify a custom domain name for data collection. The first example shows an empty hostname, while the second shows a specific domain, 'example.com'. This is crucial for consolidating data from various sources under a unified view in the Simple Analytics dashboard.

```HTML
<script async data-hostname="" src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

```HTML
<script async data-hostname="example.com" src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

### Send Page View Data via cURL

Source: https://docs.simpleanalytics.com/events/server-side

Illustrates a cURL command for submitting page view data to the Simple Analytics events endpoint. This example shows the JSON payload structure for a page view, including type, hostname, event, path, and user agent.

```shell
curl -X POST -H "Content-Type: application/json" -d '{
  "type": "pageview",
  "hostname": "mobile-app.example.com",
  "event": "pageview",
  "path": "/my-page-name",
  "ua": "Your User Agent"
}' https://queue.simpleanalyticscdn.com/events
```

---

### Export Daily Data from Simple Analytics API (cURL)

Source: https://docs.simpleanalytics.com/api/export-data-points

This cURL example demonstrates how to export daily pageview data from the Simple Analytics API. It includes parameters for date range, robot filtering, timezone, and specific fields, along with required authentication headers. This snippet is useful for testing API key functionality.

```Shell
curl "https://simpleanalytics.com/api/export/datapoints?version=5&format=csv&hostname=simpleanalytics.com&start=2025-06-04&end=2025-07-04&robots=false&timezone=Europe%2FAmsterdam&fields=added_iso,path&type=pageviews" \
     -H 'User-Id: sa_user_id_00000000-0000-0000-0000-000000000000' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
     -H 'Content-Type: text/csv'
```

---

### Authenticate Simple Analytics API for User Data using API Key and User ID (cURL)

Source: https://docs.simpleanalytics.com/api/authenticate

This cURL example illustrates how to authenticate API requests that require both an `Api-Key` and a `User-Id`. The `User-Id` header is necessary for accessing user-specific data, such as a list of websites associated with the account. Both credentials can be found in your Simple Analytics account settings.

```Shell
curl "https://simpleanalytics.com/api/websites" \
     -H 'Content-Type: application/json' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
     -H 'User-Id: sa_user_id_00000000-0000-0000-0000-000000000000'
```

---

### Configure AMP Analytics Component for Simple Analytics Pageview Tracking

Source: https://docs.simpleanalytics.com/collect-in-amp

This <amp-analytics> component block configures Simple Analytics to track pageviews. It defines variables, the pageview request endpoint, extra URL parameters for detailed data collection (like hostname, path, referrer, and UTM parameters), and a trigger for pageview events. Remember to replace example.com with your actual website hostname for accurate tracking.

```HTML
<amp-analytics>
  <script type="application/json">
    {
      "vars": {
        "dataHostname": "example.com"
      },
      "requests": {
        "pageview": "https://queue.simpleanalyticscdn.com/events"
      },
      "extraUrlParams": {
        "hostname": "$DEFAULT(${dataHostname}, ${sourceHostname})",
        "hostname_original": "$IF($EQUALS(${dataHostname}, ${sourceHostname}), , ${sourceHostname})",
        "path": "${sourcePath}",
        "referrer": "${documentReferrer}",
        "ua": "${userAgent}",
        "timezone": "${timezoneCode}",
        "screen_width": "${screenWidth}",
        "screen_height": "${screenHeight}",
        "viewport_width": "${viewportWidth}",
        "viewport_height": "${viewportHeight}",
        "utm_source": "QUERY_PARAM(utm_source)",
        "utm_medium": "QUERY_PARAM(utm_medium)",
        "utm_campaign": "QUERY_PARAM(utm_campaign)",
        "utm_content": "QUERY_PARAM(utm_content)",
        "utm_term": "QUERY_PARAM(utm_term)"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview",
          "extraUrlParams": {
            "type": "pageview"
          }
        }
      },
      "transport": {
        "beacon": true,
        "xhrpost": true,
        "image": false,
        "useBody": true
      }
    }
  </script>
</amp-analytics>
```

---

### Retrieve event counts using Simple Analytics Stats API

Source: https://docs.simpleanalytics.com/api/export-data-points

This URL demonstrates how to query the Simple Analytics Stats API to get the total count for specific events (e.g., `visit_pricing`) within a given time range and timezone.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&start=yesterday&end=today&timezone=Europe/Amsterdam&events=visit_pricing
```

---

### Simple Analytics Stats API: Wildcard Search for Paths Containing a Word

Source: https://docs.simpleanalytics.com/api/stats

API call example illustrating the use of wildcards ('\*') to search for pages whose paths contain a specific word. This enables broad searches for pages matching a pattern anywhere in their path.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=pages&pages=*terms*
```

---

### Send Custom Event Data via cURL

Source: https://docs.simpleanalytics.com/events/server-side

Provides a cURL command example for sending custom event data to the Simple Analytics events endpoint. This snippet demonstrates how to include a JSON payload with event type, hostname, event name, and custom metadata.

```shell
curl -X POST -H "Content-Type: application/json" -d '{
  "type": "event",
  "hostname": "mobile-app.example.com",
  "event": "consent",
  "metadata": {
    "button": "yes"
  },
  "ua": "Your User Agent"
}' https://queue.simpleanalyticscdn.com/events
```

---

### Simple Analytics Stats API: 'seconds_on_page' JSON Response Structure

Source: https://docs.simpleanalytics.com/api/stats

Example JSON response illustrating the structure when requesting the 'seconds_on_page' field. It shows 'seconds_on_page' at the root level and also embedded within individual page objects, providing both overall and page-specific median time on page.

```JSON
{
  "...": "...",
  "seconds_on_page": 26,
  "pages": [
    {
      "value": "/",
      "pageviews": 100,
      "visitors": 50,
      "seconds_on_page": 25
    },
    {
      "value": "/contact",
      "pageviews": 60,
      "visitors": 30,
      "seconds_on_page": 20
    }
  ]
}
```

---

### Simple Analytics Stats API: Retrieve Data for Specific Pages via URL Path

Source: https://docs.simpleanalytics.com/api/stats

Example API call showing an alternative method to retrieve analytics data for a specific page by embedding the page path directly into the API endpoint URL. This provides a concise way to query data for a single path.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com/contact.json?version=5&fields=histogram
```

---

### Retrieve Aggregated Statistics via Simple Analytics Stats API

Source: https://docs.simpleanalytics.com/api/stats

Demonstrates how to construct a URL to query the Simple Analytics Stats API for aggregated website statistics, including histogram data for a specific date range. This example fetches data for 'yesterday' to 'today' for 'simpleanalytics.com'. Authentication with an API key is required for private websites, but public websites can access data without credentials.

```URL
https://simpleanalytics.com/simpleanalytics.com.json?version=5&fields=histogram&start=yesterday&end=today
```

---

### Authenticate Simple Analytics API for Stats using API Key (cURL)

Source: https://docs.simpleanalytics.com/api/authenticate

This cURL example demonstrates how to authenticate requests to the Simple Analytics Stats API. It uses an `Api-Key` header, which is a required authentication method for many API features. The key should be obtained from your Simple Analytics account settings.

```Shell
curl "https://simpleanalytics.com/example.com.json?version=5&fields=histogram" \
     -H 'Content-Type: application/json' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

---

### Get Event Counts via Simple Analytics API Request

Source: https://docs.simpleanalytics.com/api/stats

Demonstrates how to query the Simple Analytics API to retrieve event counts for specific events. The request includes parameters for API version, a custom date range (yesterday to today), timezone, and a comma-separated list of event names.

```APIDOC
https://simpleanalytics.com/simpleanalytics.com.json?version=5&start=yesterday&end=today&timezone=Europe/Amsterdam&events=visit_homepage,popup_replace_show,popup_replace_close
```

---

### Implement Simple Analytics Pixel Tag for JavaScript-Free Pageviews

Source: https://docs.simpleanalytics.com/collect-in-amp

This method provides a JavaScript-free way to track pageviews using a simple image pixel. It's ideal for performance-critical environments like AMP where minimizing JavaScript is crucial. You can customize the tracked hostname and path by modifying the src URL parameters. Remember to replace example.com and /page-one with your actual site details.

```HTML
<img
  src="https://queue.simpleanalyticscdn.com/noscript.gif?hostname=example.com&path=/page-one"
  referrerpolicy="no-referrer-when-downgrade"
  alt=""
/>
```

---

### CloudQuery Source Configuration for Simple Analytics

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Defines the CloudQuery source for Simple Analytics data. This YAML file specifies the plugin details, version, tables to sync, and destination. It uses environment variables for user_id and api_key, and allows setting the data period and websites to sync.

```yaml
kind: source
spec:
  name: "simpleanalytics"
  path: "simpleanalytics/simpleanalytics"
  version: "v1.0.0"
  tables: ["*"]
  destinations:
    - "sqlite"
  spec:
    # plugin spec section
    user_id: "${SA_USER_ID}"
    api_key: "${SA_API_KEY}"
    period: 7d
    websites:
      - hostname: <your-website.com>
        # metadata_fields:
        # - fieldname_text
        # - fieldname_int
        # - ...
```

---

### Embed Simple Analytics Chart HTML and JavaScript

Source: https://docs.simpleanalytics.com/embed-chart-on-your-site

This snippet provides the minimal HTML and JavaScript required to embed a Simple Analytics chart on a webpage. It includes a `div` element to host the chart and a script tag to load the embedding functionality. Users must replace 'example.com' with their actual domain to display their own website's analytics.

```HTML
<div id="chart" data-hostname="example.com" style="aspect-ratio: 2/1">
  <p style="margin: 0">Loading chart...</p>
</div>
<script
  async
  data-chart-selectors="#chart"
  src="https://scripts.simpleanalyticscdn.com/embed.js"
></script>
```

---

### Run CloudQuery to Sync Simple Analytics Data

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Executes the CloudQuery sync command using specified configuration files (simpleanalytics.yml and sqlite.yml) to transfer Simple Analytics data to a target database like SQLite.

```bash
cloudquery sync simpleanalytics.yml sqlite.yml
```

---

### Open SQLite Database File

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Opens the generated SQLite database file (db.sql) using the `sqlite3` command-line tool to allow for data querying.

```bash
sqlite3 db.sql
```

---

### Add Website via cURL

Source: https://docs.simpleanalytics.com/api/admin

Demonstrates how to add a new website to Simple Analytics using a cURL POST request. This operation requires a Business or Enterprise plan and includes parameters for hostname, public status, and timezone.

```bash
curl -X "POST" "http://localhost:3000/api/websites/add" \
     -H 'Content-Type: application/json' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
     -H 'User-Id: sa_user_id_00000000-0000-0000-0000-000000000000' \
     -d $'{
  "public": false,
  "hostname": "example.com",
  "timezone": "Europe/Amsterdam"
}'
```

---

### Simple Analytics Admin API Overview

Source: https://docs.simpleanalytics.com/api

Documentation for the Simple Analytics Admin API, used for managing settings such as users and websites.

```APIDOC
Admin API:
  Purpose: Change settings
  Documentation Link: /api/admin
```

---

### Open Hosts File on macOS

Source: https://docs.simpleanalytics.com/exclude-ips

Command to open the system hosts file for editing using the nano text editor on macOS. This step requires administrator privileges.

```Shell
sudo nano /etc/hosts
```

---

### Set Simple Analytics API Credentials Environment Variables

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Commands to set the SA_USER_ID and SA_API_KEY environment variables. These variables are referenced in the Simple Analytics source configuration file for authentication with the Simple Analytics API.

```bash
export SA_USER_ID=<your-user-id>
export SA_API_KEY=<your-api-key>
```

---

### Simple Analytics Export API Overview

Source: https://docs.simpleanalytics.com/api

Documentation for the Simple Analytics Export API, designed for accessing raw data points.

```APIDOC
Export API:
  Purpose: Raw data points data
  Documentation Link: /api/export-data-points
```

---

### Apply Hosts File Changes on Windows

Source: https://docs.simpleanalytics.com/exclude-ips

Command to flush the DNS resolver cache on Windows, which helps in applying changes made to the hosts file without requiring a system restart, ensuring the new blocking rule takes effect.

```Batch
ipconfig /flushdns
```

---

### Embed Multiple Simple Analytics Charts

Source: https://docs.simpleanalytics.com/embed-chart-on-your-site

Illustrates embedding multiple Simple Analytics charts on a single page, each within its own `div` element with a unique ID and `data-hostname`. A single asynchronous script tag is then used, leveraging the `data-chart-selectors` attribute to initialize all specified charts efficiently, reducing script overhead.

```HTML
<!-- Chart 1 with data from simpleanalytics.com -->
<div
  id="chart-id-1"
  data-hostname="simpleanalytics.com"
  style="aspect-ratio: 2/1"
>
  <p style="margin: 0;">
    Chart is not loading. It might be blocked by an ad-blocker.
  </p>
</div>

<!-- Chart 2 with data from dashboard.simpleanalytics.com -->
<div
  id="chart-id-2"
  data-hostname="dashboard.simpleanalytics.com"
  style="aspect-ratio: 2/1"
>
  <p style="margin: 0;">
    Chart is not loading. It might be blocked by an ad-blocker.
  </p>
</div>

<!-- One script tag for multiple charts -->
<script
  async
  data-chart-selectors="#chart-id-1,#chart-id-2"
  src="https://scripts.simpleanalyticscdn.com/embed.js"
></script>
```

---

### CloudQuery Destination Configuration for SQLite

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Defines the CloudQuery destination for exporting data to a SQLite database. This YAML file specifies the plugin details, version, and the connection_string to define the path for the SQLite database file.

```yaml
kind: destination
spec:
  name: sqlite
  path: cloudquery/sqlite
  version: "v1.2.1"
  spec:
    connection_string: ./db.sql
```

---

### Simple Analytics API: Add Website Endpoint

Source: https://docs.simpleanalytics.com/api/admin

Details the API endpoint for adding a new website to Simple Analytics. This operation requires a Business or Enterprise plan and allows specifying website properties like public status, hostname, and timezone.

```APIDOC
Endpoint: POST https://simpleanalytics.com/api/websites/add

Description: Add a new website to your Simple Analytics account.
Requires: Business or Enterprise plan.

Request Body (application/json):
  "public": boolean - Set the website to public or private.
  "hostname": string - The domain name of the website (e.g., "example.com").
  "timezone": string (optional) - The time zone for the website (e.g., "Europe/Amsterdam").
                                  Refer to Wikipedia for valid tz database time zones.
                                  Defaults to UTC if not specified.
```

---

### Embed Simple Analytics Light Script

Source: https://docs.simpleanalytics.com/light

This HTML snippet demonstrates how to embed the light version of the Simple Analytics tracking script into a webpage. It replaces the standard 'latest.js' with 'light.js' for a smaller footprint, and includes a 'noscript' fallback for users with JavaScript disabled to still count page views.

```HTML
<script async src="https://scripts.simpleanalyticscdn.com/light.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

---

### Add Domain Blocking Entry to Hosts File

Source: https://docs.simpleanalytics.com/exclude-ips

The specific line to add to the hosts file on both macOS and Windows to redirect scripts.simpleanalyticscdn.com to 0.0.0.0, effectively blocking access to the domain for analytics tracking.

```Text
0.0.0.0 scripts.simpleanalyticscdn.com
```

---

### Simple Analytics Stats API: All Query Parameters

Source: https://docs.simpleanalytics.com/api/stats

Comprehensive list of all available query parameters for the Simple Analytics Stats API, detailing their purpose, format, and default values. These parameters control data retrieval, date ranges, limits, timezones, and the specific fields returned in the API response.

```APIDOC
Parameter: version
  Description: The version of the API
  Type: integer
  Default: 5 (latest)

Parameter: start
  Description: The start date for data retrieval
  Format: YYYY-MM-DD
  Default: 1 month ago

Parameter: end
  Description: The end date for data retrieval
  Format: YYYY-MM-DD
  Default: today

Parameter: limit
  Description: A limit for the fields
  Range: 1-1000

Parameter: timezone
  Description: A valid time zone
  Example: Europe/Amsterdam

Parameter: info
  Description: Shows more information about fields in the response
  Type: boolean
  Default: true

Parameter: callback
  Description: Wraps the response in a callback for JSONP

Parameter: events
  Description: A list of specified events and how much they occurred

Parameter: fields
  Description: A comma separated list of fields you want to get returned
  Values:
    - pageviews: total amount of page views
    - visitors: total amount of unique page views
    - histogram: array with page views and visitors per day
    - pages: comma separated list of pages for stats
    - countries: list of country codes
    - referrers: list of normalized referrers
    - utm_sources: list of UTM sources
    - utm_mediums: list of UTM mediums
    - utm_campaigns: list of UTM campaigns
    - utm_contents: list of UTM contents
    - utm_terms: list of UTM terms
    - browser_names: list of browser names
    - os_names: list of OS names
    - device_types: list of device types (mobile, tablet, desktop, tv)
    - seconds_on_page: median of seconds a visitor spent on the page
```

---

### Configure SQLite Display Mode

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Sets the SQLite command-line interface to column mode and enables headers for better readability of query results.

```sqlite
.mode column
.headers on
```

---

### Simple Analytics Stats API Overview

Source: https://docs.simpleanalytics.com/api

Documentation for the Simple Analytics Stats API, which provides aggregated analytics data.

```APIDOC
Stats API:
  Purpose: Aggregated data
  Documentation Link: /api/stats
```

---

### Include AMP Analytics Script in HTML Head

Source: https://docs.simpleanalytics.com/collect-in-amp

This asynchronous script is essential for enabling the <amp-analytics> component within your AMP pages. It must be placed in the <head> section of your HTML document to ensure proper functionality and component loading.

```HTML
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

---

### Apply Hosts File Changes on macOS

Source: https://docs.simpleanalytics.com/exclude-ips

Commands to flush the DNS cache and restart the mDNSResponder service on macOS, ensuring that changes made to the hosts file are immediately applied by the operating system.

```Shell
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

---

### Collect Page Views for Browser Extensions with Pixel

Source: https://docs.simpleanalytics.com/without-javascript

Illustrates how to configure the Simple Analytics pixel for browser extensions, which often lack normal URLs or referrer information. It requires explicitly setting `hostname` and `path` parameters in the pixel URL to ensure data is recorded correctly.

```HTML
<img
  src="https://queue.simpleanalyticscdn.com/noscript.gif?hostname=example.com&path=%2F"
  referrerpolicy="no-referrer-when-downgrade"
  alt=""
/>
```

---

### Embed Simple Analytics Script with SRI

Source: https://docs.simpleanalytics.com/sri

This HTML snippet provides the full embed code for integrating Simple Analytics using a Subresource Integrity (SRI) version of the script. It includes `sha256`, `sha384`, and `sha512` hashes to verify the script's content, ensuring it hasn't been tampered with. A `noscript` fallback is also provided for users with JavaScript disabled. For custom domains, the script path changes, and you would need to generate new SRI hashes.

```HTML
<script async src="https://scripts.simpleanalyticscdn.com/sri/v11.js" integrity="sha256-hkUzQr3zWmSDnmhw95ZmQSZ949upqD+ML9ejiN0UIIE= sha384-rfv15RJy1bBYZ1Mf4xizO26jorXb2myipCvHXy4rkG0SuEET96S+m0sTzu5vfbSI sha512-lQzjzTbOxHLwkZGDVMf4V0sm8v2Mrqm73IvKcXBftJ/MSZKQC4/jwKFToxT+3IVAVWQzLplSNHH8gM5d7b1BSg==" crossorigin="anonymous"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

---

### Locate Hosts File on Windows

Source: https://docs.simpleanalytics.com/exclude-ips

The standard file path for the hosts file on Windows operating systems. This file needs to be opened with administrator privileges for editing.

```File Path
C:\Windows\System32\drivers\etc\hosts
```

---

### Configure Simple Analytics to Ignore Pages with Wildcards

Source: https://docs.simpleanalytics.com/ignore-pages

This HTML script tag configures Simple Analytics to ignore specific page paths using wildcards. The `data-ignore-pages` attribute accepts a comma-separated list of paths, where an asterisk (`*`) acts as a wildcard to match any string. This allows for flexible exclusion of dynamic URLs like `/search/*` or `/accounts/*` from analytics tracking.

```HTML
<script
  data-ignore-pages="/search/*,/accounts/*,/vouchers"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Simple Analytics Chart Onload Callback

Source: https://docs.simpleanalytics.com/embed-chart-on-your-site

Shows how to implement a JavaScript `onLoad` callback function that executes after Simple Analytics charts have finished loading. This function, specified via the `data-onload` attribute on the embed script, allows developers to perform custom actions, such as logging success or hiding elements in case of loading failures.

```JavaScript
function onLoad(ok) {
  if (ok) console.log("All charts loaded successfully");
  else {
    // Hide all elements that show charts
    // ...
  }
}
```

```HTML
<div id="chart" style="aspect-ratio: 2/1" data-hostname="example.com"></div>
<script
  async
  src="https://scripts.simpleanalyticscdn.com/embed.js"
  data-chart-selectors="#chart"
  data-onload="onLoad"
></script>
```

---

### Comprehensive Event Data Structure with Optional Fields

Source: https://docs.simpleanalytics.com/events/server-side

Presents an extended JSON structure for submitting event data to Simple Analytics, showcasing all available optional fields. This includes referrer, viewport and screen dimensions, language, timezone, UTM parameters (source, campaign, medium, content), and custom metadata.

```JSON
{
  "type": "event",
  "hostname": "example.com",
  "event": "event-name",
  "path": "/",
  "unique": true,
  "https": true,
  "ua": "User Agent",
  "referrer": "https://www.anotherexample.com/page-1",

  "viewport_width": 1440,
  "viewport_height": 310,
  "screen_width": 1440,
  "screen_height": 900,

  "language": "en-US",
  "timezone": "Europe/Amsterdam",

  "source": "source",
  "campaign": "campaign",
  "medium": "medium",
  "content": "content",

  "metadata": {
    "button": "yes"
  }
}
```

---

### JavaScript helper for custom link click event tracking

Source: https://docs.simpleanalytics.com/events/custom-link-clicks

This JavaScript code defines a function that queries for <a> elements with the 'data-sa-link-event' attribute. It attaches a click event listener to these links, preventing default behavior for '\_blank' targets and calling 'window.sa_event' to record the specified event name. The script ensures execution after the DOM is ready.

```JavaScript
<script>
  (function () {
    function saLoadedLinkEvents() {
      document
        .querySelectorAll("a[data-sa-link-event]")
        .forEach(function (element) {
          var href = element.getAttribute("href");
          var eventName = element.getAttribute("data-sa-link-event");
          if (!href || !window.sa_event || !window.sa_loaded) return;

          element.addEventListener("click", function (event) {
            var target = element.getAttribute("target");
            if (target === "_blank") {
              event.preventDefault();
              window.sa_event(eventName, function () {
                window.location.href = href;
              });
              return false;
            } else {
              window.sa_event(eventName);
              return true;
            }
          });
        });
    }

    if (document.readyState === "ready" || document.readyState === "complete") {
      saLoadedLinkEvents();
    } else {
      document.addEventListener("readystatechange", function (event) {
        if (event.target.readyState === "complete") saLoadedLinkEvents();
      });
    }
  })();
</script>
```

---

### Embed Simple Analytics Auto-Events Script (Basic)

Source: https://docs.simpleanalytics.com/automated-events

This HTML snippet provides the standard asynchronous embedding code for the Simple Analytics main script and the auto-events script. It's the simplest way to integrate automated event tracking without any custom settings.

```HTML
<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<script async src="https://scripts.simpleanalyticscdn.com/auto-events.js"></script>
```

---

### Google Universal Analytics Dimensions Reference

Source: https://docs.simpleanalytics.com/import-google-analytics-data

Outlines the dimensions available for Google Universal Analytics data import, covering combined date and hour, page paths, full referrer URLs, device categories, country ISO codes, browser names, and browser versions.

```APIDOC
ga:dateHour: The combined values of date and hour formatted as YYYYMMDDHH.
ga:pagePath: A page on the website specified by path and/or query parameters. Use this with hostname to get the page’s full URL.
ga:fullReferrer: The full referring URL including the hostname and path.
ga:deviceCategory: The type of device: desktop, tablet, or mobile.
ga:countryIsoCode: Users’ country’s ISO code (in ISO-3166-1 alpha-2 format), derived from their IP addresses or Geographical IDs. For example, BR for Brazil, CA for Canada.
ga:browser: The name of users’ browsers, for example, Internet Explorer or Firefox.
ga:browserVersion: The version of users’ browsers, for example, 2.0.0.14.
```

---

### Enable URL Hash Tracking for Simple Analytics

Source: https://docs.simpleanalytics.com/hash-mode

This HTML script tag demonstrates how to include the Simple Analytics tracking script with the `data-mode="hash"` attribute. This attribute instructs the Simple Analytics script to detect and record page views when only the URL hash changes, which is crucial for web applications that use hash-based routing without full page reloads. The `async` attribute ensures the script loads without blocking page rendering.

```HTML
<script data-mode="hash" async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

### Add Simple Analytics Tracking Script

Source: https://docs.simpleanalytics.com/script

This HTML snippet provides the basic asynchronous JavaScript code required to integrate Simple Analytics into a webpage. It is recommended to place this script at the end of the `<body>` tag for optimal performance and privacy-first analytics collection.

```HTML
<!-- Simple Analytics - 100% privacy-first analytics -->
<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

### Simple Analytics Stats API Overview

Source: https://docs.simpleanalytics.com/api/export-data-points

This section introduces the Simple Analytics Stats API, which allows users to retrieve total counts for specific events. It highlights its simple request and response structure.

```APIDOC
If you are only interested in how many certain events happened, you can use our [Stats API](/api/stats#events). It has a simple request and response with event totals.
```

---

### Embed Simple Analytics for Non-JavaScript Environments

Source: https://docs.simpleanalytics.com/script

This HTML `noscript` tag allows Simple Analytics to capture data from users who have JavaScript disabled. It uses an image beacon to track page views. Be aware that this method might also increase traffic from bots.

```HTML
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

---

### Content Security Policy Header for Simple Analytics

Source: https://docs.simpleanalytics.com/csp

This Content Security Policy (CSP) header is recommended for websites using Simple Analytics. It specifies allowed sources for scripts, connection requests, and images, including 'self' for same-origin resources and 'unsafe-inline' for scripts, along with Simple Analytics' specific domains. This helps enhance security against XSS and data injection attacks.

```HTTP Header
Content-Security-Policy: script-src 'self' 'unsafe-inline' https://scripts.simpleanalyticscdn.com; connect-src 'self' https://queue.simpleanalyticscdn.com; img-src 'self' https://queue.simpleanalyticscdn.com https://simpleanalyticsbadges.com;
```

---

### Simple Analytics Data Export API Fields Reference

Source: https://docs.simpleanalytics.com/api/export-data-points

This section details the available fields for data export from the Simple Analytics API. Each field includes its type and a description, providing comprehensive information on the data attributes that can be retrieved. It also notes that some fields like `scrolled_percentage` and `duration_seconds` are conditionally available.

```APIDOC
Field: added_unix
  Type: number
  Description: The time of the page view in unix time format
Field: added_iso
  Type: date
  Description: The time of the page view in ISO8601 format
Field: hostname
  Type: string
  Description: The hostname of the website
Field: hostname_original
  Type: string
  Description: When the hostname is overwritten, we store the original hostname
Field: path
  Type: string
  Description: The path of the page view
Field: query
  Type: string
  Description: The query parameters of the URL
Field: is_unique
  Type: boolean
  Description: Is this page view unique
Field: is_robot
  Type: boolean
  Description: Is page view visited by a robot or crawler
Field: document_referrer
  Type: string
  Description: The JavaScript document.referrer of the page
Field: utm_source
  Type: string
  Description: UTM source (specify via `ref=` or `utm_source` in your URL)
Field: utm_medium
  Type: string
  Description: UTM medium (specify via `utm_medium` in your URL)
Field: utm_campaign
  Type: string
  Description: UTM campaign (specify via `utm_campaign` in your URL)
Field: utm_content
  Type: string
  Description: UTM content (specify via `utm_content` in your URL)
Field: utm_term
  Type: string
  Description: UTM term (specify via `utm_term` in your URL)
Field: scrolled_percentage
  Type: number
  Description: How far did a visitor scroll on the page (in steps of 5%)
Field: duration_seconds
  Type: number
  Description: How many seconds did a visitor stay on this page (we stop the counter when a page is hidden)
Field: viewport_width
  Type: number
  Description: Viewport width in pixels
Field: viewport_height
  Type: number
  Description: Viewport height in pixels
Field: screen_width
  Type: number
  Description: Screen width in pixels
Field: screen_height
  Type: number
  Description: Screen height in pixels
Field: user_agent
  Type: string
  Description: The navigator.userAgent of a browser (in case of a fake one we don’t store it.
Field: device_type
  Type: string
  Description: Either desktop, mobile, tablet, or tv.
Field: country_code
  Type: string
  Description: 2 letter country code
Field: browser_name
  Type: string
  Description: Browser name
Field: browser_version
  Type: string
  Description: Browser version (do note this is a string)
Field: os_name
  Type: string
  Description: OS name
Field: os_version
  Type: string
  Description: OS version (do note this is a string)
Field: lang_region
  Type: string
  Description: The region part of navigator.language
Field: lang_language
  Type: string
  Description: The language part of navigator.language
Field: uuid
  Type: string
  Description: A UUID v4 of the page view (this is not always unique)
Field: metadata.***
  Type: N/A
  Description: Metadata are your own specified fields followed by a type (e.g. `project_text`)
```

---

### Simple Analytics API Metadata Fields Structure

Source: https://docs.simpleanalytics.com/api/export-data-points

This section describes the naming conventions and typing of metadata fields within the Simple Analytics API. User-defined metadata fields are dynamically typed with suffixes like `_text`, `_date`, `_bool`, or `_int`. It also notes the `metadata.sa_urlparam_` prefix for allowed URL parameters.

```APIDOC
Because metadata fields are defined by the user, we don’t know the fields upfront. The [export UI](/api/helpers#generate-export-url) gives a good overview of all metadata fields available for a certain period. Use those fields in the export API.

Fields in the API and exporter have a type appended to them. You can see fields like `metadata.fieldname_text`, `metadata.fieldname_date`, `metadata.fieldname_bool`, or `metadata.fieldname_int` (where fieldname is a user-defined name). Some metadata fields can have both, for example, `metadata.projectID_text` and `metadata.projectID_int`. If a text looks like a number, we convert it to an integer and we keep the text version.

When you see something prefixed with `metadata.sa_urlparam_`, it’s a paramter from the [allowed URL parameters feature](/allow-params).
```

---

### Export hourly data from Simple Analytics API

Source: https://docs.simpleanalytics.com/api/export-data-points

This `curl` command exports hourly pageview data from Simple Analytics for a specific date and time (3 PM today in Amsterdam) in CSV format. It requires User-Id and API-Key for authentication and specifies fields to include.

```shell
curl "https://simpleanalytics.com/api/export/datapoints?version=5&format=csv&hostname=simpleanalytics.com&start=2025-07-04T15&end=2025-07-04T15&robots=false&timezone=Europe%2FAmsterdam&fields=added_iso,path&type=pageviews" \
     -H 'User-Id: sa_user_id_00000000-0000-0000-0000-000000000000' \
     -H 'Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
     -H 'Content-Type: text/csv'
```

---

### Query Top Page Views in SQLite

Source: https://docs.simpleanalytics.com/export-to-data-warehouse-with-cloudquery

Executes a SQL query on the `simple_analytics_page_views` table to retrieve the top 3 most viewed paths, grouped by path and ordered by count.

```sqlite
select path, count(*) as count from simple_analytics_page_views group by path order by count desc limit 3;
```

---

### Configure Simple Analytics to allow custom URL parameters

Source: https://docs.simpleanalytics.com/allow-params

This HTML script tag demonstrates how to configure the Simple Analytics tracking script to collect additional, non-standard URL parameters. By adding the `data-allow-params` attribute with a comma-separated list of parameter names, you can instruct Simple Analytics to store these specific query parameters from your website's URLs, such as `product-id` or `article-slug`.

```HTML
<script
  data-allow-params="product-id,article-slug"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Simple Analytics Stats API: Data Filtering Parameters

Source: https://docs.simpleanalytics.com/api/stats

List of parameters available for filtering the returned data from the Simple Analytics Stats API. These filters allow users to narrow down results based on specific pages, countries, referrers, UTM parameters, browser names, OS names, and device types.

```APIDOC
Filter: page
  Description: Filter by a specific page

Filter: pages
  Description: Filter by a comma separated list of pages
  Example: /contact,/product/*

Filter: country
  Description: Filter by a country code

Filter: referrer
  Description: Filter by a normalized referrer

Filter: utm_source
  Description: Filter by a UTM source

Filter: utm_medium
  Description: Filter by a UTM medium

Filter: utm_campaign
  Description: Filter by a UTM campaign

Filter: utm_content
  Description: Filter by a UTM content

Filter: utm_term
  Description: Filter by a UTM term

Filter: browser_name
  Description: Filter by a browser name

Filter: os_name
  Description: Filter by a OS name

Filter: device_type
  Description: Filter by a device type (mobile, tablet, desktop, tv)

Note: These filters do not affect the 'events' query parameter.
```

---

### Google Universal Analytics Metrics Reference

Source: https://docs.simpleanalytics.com/import-google-analytics-data

Specifies the metrics available for Google Universal Analytics data import, including total pageviews, total sessions, and the time users spent on a particular page.

```APIDOC
ga:pageviews: The total number of pageviews for the property.
ga:sessions: The total number of sessions.
ga:timeOnPage: Time (in seconds) users spent on a particular page, calculated by subtracting the initial view time for a particular page from the initial view time for a subsequent page. This metric does not apply to exit pages of the property.
```

---

### Specify custom referrer using URL parameter

Source: https://docs.simpleanalytics.com/how-to-use-url-parameters

Demonstrates how to use the `ref` URL parameter to set a custom referrer for Simple Analytics tracking. This allows you to attribute traffic from specific campaigns or sources, such as an email newsletter, overriding the browser's default referrer information.

```URL
https://example.com/landing-page?ref=email
```

---

### Export Specific Data Points from Simple Analytics API (cURL)

Source: https://docs.simpleanalytics.com/api/export-data-points

This cURL command exports specific data points from the Simple Analytics API for a precise date and time. It requires `User-Id` and `Api-Key` headers for authentication. The `fields` parameter specifies which data attributes to include in the CSV output.

```Shell
curl "https://simpleanalytics.com/api/export/datapoints?version=5&format=csv&hostname=example.com&start=2025-07-04T14&end=2025-07-04T14&fields=added_iso,path" \
     -H 'User-Id: sa_user_id_...' \
     -H 'Api-Key: sa_api_key_...'
```

---

### Google Analytics 4 Dimensions Reference

Source: https://docs.simpleanalytics.com/import-google-analytics-data

Lists the available dimensions for Google Analytics 4 data import, providing details on user activity, page information, session sources, device categories, geographic IDs, browser types, operating systems, event names, and hostnames.

```APIDOC
dateHour: The combined values of date and hour formatted as YYYYMMDDHH.
fullPageUrl: The hostname, page path, and query string for web pages visited; for example, the fullPageUrl portion of https://www.example.com/store/contact-us?query_string=true is www.example.com/store/contact-us?query_string=true.
sessionSource: The source that initiated a session on your website or app.
deviceCategory: The type of device: Desktop, Tablet, or Mobile.
countryId: The geographic ID of the country from which the user activity originated, derived from their IP address. Formatted according to ISO 3166-1 alpha-2 standard.
browser: The browsers used to view your website.
operatingSystem: The operating systems used by visitors to your app or website. Includes desktop and mobile operating systems such as Windows and Android.
eventName: The name of the event. For example, page_view.
hostname: Includes the subdomain and domain names of a URL; for example, the Host Name of www.example.com/contact.html is www.example.com.
```

---

### Google Analytics 4 Metrics Reference

Source: https://docs.simpleanalytics.com/import-google-analytics-data

Details the metrics available for Google Analytics 4 data import, including screen page views, total distinct users, and the duration of user engagement with the website or app.

```APIDOC
screenPageViews: The number of app screens or web pages your users viewed. Repeated views of a single page or screen are counted. (screen_view + page_view events).
totalUsers: The number of distinct users who have logged at least one event, regardless of whether the site or app was in use when that event was logged.
userEngagementDuration: The total amount of time (in seconds) your website or app was in the foreground of users’ devices.
```

---

### Simple Analytics Data Fields Reference

Source: https://docs.simpleanalytics.com/goals

This section details the various data fields collected and provided by Simple Analytics, including their types and descriptions. These fields are fundamental for understanding the data available for analysis and reporting within the Simple Analytics platform.

```APIDOC
Simple Analytics Data Fields:
  Date & time:
    Type: date
    Description: The date of the data point
  Path:
    Type: string
    Description: The path of the data point
  Is unique:
    Type: boolean
    Description: Is this page view unique
  UTM source:
    Type: string
    Description: UTM source (specify via `ref=` or `utm_source` in your URL)
  UTM medium:
    Type: string
    Description: UTM medium (specify via `utm_medium` in your URL)
  UTM campaign:
    Type: string
    Description: UTM campaign (specify via `utm_campaign` in your URL)
  UTM content:
    Type: string
    Description: UTM content (specify via `utm_content` in your URL)
  UTM term:
    Type: string
    Description: UTM term (specify via `utm_term` in your URL)
  Scrolled percentage:
    Type: number
    Description: How far did a visitor scroll on the page (in steps of 5%)
  Duration seconds:
    Type: number
    Description: How many seconds did a visitor stay on this page (we stop the counter when a page is hidden)
  Screen width:
    Type: number
    Description: Screen width in pixels
  Screen height:
    Type: number
    Description: Screen height in pixels
  Country code:
    Type: string
    Description: 2 letter country code
  Browser name:
    Type: string
    Description: Browser name
  Browser version:
    Type: string
    Description: Browser version (do note this is a string)
  OS name:
    Type: string
    Description: OS name
  OS version:
    Type: string
    Description: OS version (do note this is a string)
  Device type:
    Type: string
    Description: Either desktop, mobile, tablet, or tv
  Lang region:
    Type: string
    Description: The region part of [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)
  Lang language:
    Type: string
    Description: The language part of [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)
  Referrer hostname:
    Type: string
    Description: The hostname of the referring page/website
  Referrer path:
    Type: string
    Description: The path of the referring page/website
```

---

### Simple Analytics API Authentication Headers for Power BI

Source: https://docs.simpleanalytics.com/microsoft-power-bi

To authenticate requests to the Simple Analytics API when connecting from Microsoft Power BI, two specific HTTP headers are required. These credentials, User-Id and Api-Key, must be retrieved from your Simple Analytics account page and configured within the advanced settings of the Power BI web connector.

```APIDOC
User-Id: sa_user_id_00000000-0000-0000-0000-000000000000
Api-Key: sa_api_key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### Simple Analytics API Field Selection

Source: https://docs.simpleanalytics.com/api/export-data-points

This section describes how to select specific fields for export in the Simple Analytics API. Fields are specified as a comma-separated list within the `fields` query parameter, allowing users to customize the exported data.

```APIDOC
Parameter: fields
  Type: string
  Format: comma-separated list
  Example: `&fields=added_iso,hostname,path`
  Description: Specifies all fields to be exported.
```

---

### Page View Data Structure

Source: https://docs.simpleanalytics.com/events/server-side

Defines the basic JSON structure required for submitting page view data to the Simple Analytics API. It includes essential fields like type, hostname, event, path, and user agent.

```JSON
{
  "type": "pageview",
  "hostname": "example.com",
  "event": "pageview",
  "path": "/page-name",
  "ua": "User Agent"
}
```

---

### Ignore Multiple Metrics in Simple Analytics Script

Source: https://docs.simpleanalytics.com/ignore-metrics

Illustrates how to configure the Simple Analytics script to prevent the collection of multiple metrics by providing a comma-separated list of metric slugs to the `data-ignore-metrics` attribute.

```HTML
<script
  data-ignore-metrics="timeonpage,scrolled"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Embed Simple Analytics Script with Single Non-Unique Hostname

Source: https://docs.simpleanalytics.com/non-unique-hostnames

This HTML snippet demonstrates how to embed the Simple Analytics tracking script and configure it to treat visits originating from a specific external hostname (e.g., a payment provider) as non-unique. This prevents returning visitors from being counted as new.

```HTML
<script
  data-non-unique-hostnames="checkout.stripe.com"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Embed Simple Analytics Script with Multiple Non-Unique Hostnames

Source: https://docs.simpleanalytics.com/non-unique-hostnames

This HTML snippet shows how to embed the Simple Analytics tracking script and specify multiple external hostnames, separated by commas, whose originating visits should be considered non-unique. This is useful when integrating with several payment gateways or external services.

```HTML
<script
  data-non-unique-hostnames="checkout.stripe.com,checkout.adyen.com,checkout.mollie.com"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Customize Simple Analytics Chart HTML Attributes

Source: https://docs.simpleanalytics.com/embed-chart-on-your-site

Demonstrates how to embed a Simple Analytics chart using a `div` element and customize its appearance and data filtering. Various `data-` attributes control parameters like hostname, date range, data types (visitors, page views), specific page filtering, y-axis maximum, timezone, colors, border width, and logo visibility.

```HTML
<div
  id="chart"
  style="aspect-ratio: 2/1"
  data-hostname="example.com"
  data-start="2025-06-04"
  data-end="2025-07-04"
  data-types="visitors"
  data-page-views-selector="#pageviews"
  data-visitors-selector="#visitors"
  data-pages="/,/contact"
  data-y-max="60000"
  data-timezone="Europe/Amsterdam"
  data-border-width="1"
  data-text-color="#ff6600"
  data-page-views-color="#ff6600"
  data-visitors-color="#cc2200"
  data-area-opacity="10"
  data-show-logo="true"
></div>
```

---

### HTML Noscript Tracking Pixel for Simple Analytics

Source: https://docs.simpleanalytics.com/overwrite-domain-name

This HTML snippet demonstrates how to embed a noscript tracking pixel from Simple Analytics. It's intended for environments where JavaScript is disabled, but its use is generally not recommended as it primarily collects data from bots rather than human users.

```HTML
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif?hostname=example.com" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

---

### Enable DNT Collection for noscript.gif Pixel

Source: https://docs.simpleanalytics.com/dnt

To enable Do Not Track (DNT) visit collection for the `noscript.gif` pixel, append the `collect-dnt=true` parameter to the pixel URL. This ensures that visits from users with DNT enabled are still recorded.

```URL Parameter
noscript.gif?collect-dnt=true
```

---

### Simple Analytics Data Export API Deprecated Fields

Source: https://docs.simpleanalytics.com/api/export-data-points

This section lists fields that are deprecated in the Simple Analytics Data Export API. While still supported for backward compatibility, it is recommended to use their suggested replacements for new projects to ensure future compatibility and best practices.

```APIDOC
Field: url
  Description: Please use hostname and path to get the full URL
Field: referrer
  Description: We replaced this with document_referrer
Field: referrer_raw
  Description: We replaced this with document_referrer
Field: device_width_pixels
  Description: We replaced this with viewport_width
Field: device_width
  Description: We replaced this with viewport_width
Field: source
  Description: What is the source of this page view, mostly `js` from our JavaScript
```

---

### JavaScript function to customize Simple Analytics page paths

Source: https://docs.simpleanalytics.com/overwrite-path

This snippet provides a JavaScript function, `myPathOverwriter`, designed to modify the `path` parameter before it's sent to Simple Analytics. It demonstrates how to replace dynamic parts of a URL, such as user IDs in `/profiles/`, with a generic placeholder (`/profiles/***`) for privacy or aggregation purposes. The function is then integrated with the Simple Analytics script using the `data-path-overwriter` attribute.

```javascript
<script>
  function myPathOverwriter({ path }) {
    if (path.startsWith("/profiles/")) path = "/profiles/***";
    return path;
  }
</script>
<script
  data-path-overwriter="myPathOverwriter"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Track Button Clicks with HTML Data Attributes

Source: https://docs.simpleanalytics.com/events/inline

To track a click, add the `data-simple-event="event_name"` attribute to any clickable HTML element. The Simple Analytics script will prevent the default action, send your event, and then allow the original click action to proceed, including opening links.

```HTML
<a href="/pricing" data-simple-event="visit_pricing_page">See pricing</a>
```

---

### Enable Strict UTM Collection in Simple Analytics

Source: https://docs.simpleanalytics.com/strict-utms

This HTML script tag configuration enables strict UTM parameter collection for Simple Analytics. When 'data-strict-utm' is set to 'true', the script will only process standard 'utm\_' prefixed parameters (e.g., utm_source, utm_medium) and ignore non-standard or alternative parameters like 'source' or 'ref'. This provides more precise control over collected marketing attribution data.

```HTML
<script
  data-strict-utm="true"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Embed Simple Analytics Auto-Events Script with Custom Data Attributes

Source: https://docs.simpleanalytics.com/automated-events

This HTML snippet shows an advanced embedding method for the Simple Analytics auto-events script. It uses data- attributes to configure specific tracking behaviors, such as collecting outbound links, emails, and downloads, defining tracked file extensions, and controlling the use of page titles and full URLs for events.

```HTML
<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<script
  async
  data-collect="outbound,emails,downloads"
  data-extensions="pdf,csv,docx,xlsx,zip,doc,xls"
  data-use-title="true"
  data-full-urls="false"
  src="https://scripts.simpleanalyticscdn.com/auto-events.js"></script>
```

---

### Legacy and Current DNT HTML Attributes

Source: https://docs.simpleanalytics.com/dnt

The legacy HTML attribute for DNT settings was `data-skip-dnt`. The current and recommended attribute is `data-collect-dnt`. Both attributes are functional, but `data-collect-dnt` should be preferred for new implementations.

```HTML Attribute
data-skip-dnt
```

```HTML Attribute
data-collect-dnt
```

---

### Simple Analytics API Event Counts JSON Response

Source: https://docs.simpleanalytics.com/api/stats

Illustrates the expected JSON structure returned by the Simple Analytics API when querying for event counts. It shows an array of event objects, each containing the event name and its total count, providing a clear overview of collected event data.

```JSON
{
  "events": [
    {
      "name": "visit_homepage",
      "total": 233
    },
    {
      "name": "popup_replace_show",
      "total": 117
    },
    {
      "name": "popup_replace_close",
      "total": 61
    }
  ]
}
```

---

### HTML/JavaScript: Manually Triggering Simple Analytics Page Views

Source: https://docs.simpleanalytics.com/trigger-custom-page-views

This HTML snippet demonstrates how to manually trigger page views using the `sa_pageview` function when Simple Analytics' auto-collection is disabled via the `data-auto-collect="false"` attribute. It includes an `onload` handler for the script to ensure `sa_pageview` is available before being called. The function sends a page view for the current path or a specified path if provided.

```HTML
<script>
  function saLoaded() {
    // Always check for the function before using it.
    // The script might be blocked or not loaded for other reasons.
    if (window.sa_pageview) window.sa_pageview(window.location.pathname);
  }
</script>

<script
  async
  data-auto-collect="false"
  onload="saLoaded()"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
<noscript
  ><img
    src="https://queue.simpleanalyticscdn.com/noscript.gif"
    alt=""
    referrerpolicy="no-referrer-when-downgrade"
/></noscript>
```

---

### Enable data collection for Do Not Track (DNT) visitors

Source: https://docs.simpleanalytics.com/dnt

To override the default behavior and collect data from users who have the Do Not Track (DNT) setting enabled in their browser, add the 'data-collect-dnt="true"' attribute to your Simple Analytics script tag. This ensures that visits from DNT-enabled devices are recorded.

```HTML
<script data-collect-dnt="true" async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

### Simple Analytics Server-side Event Data Submission API

Source: https://docs.simpleanalytics.com/events/server-side

Details for submitting server-side and mobile app event data to Simple Analytics. Data is sent to a specific endpoint using JSON format, with important considerations for user agent strings to avoid bot detection.

```APIDOC
Endpoint: https://queue.simpleanalyticscdn.com/events
Method: POST

Request Body Format: JSON

User Agent Guidelines:
  - Avoid default user agents from request libraries (e.g., 'bot', 'crawl', 'python-requests', 'curl', 'node-fetch', 'axios').
  - Use the real user agent of the end-user, or a custom format like 'ServerSide/1.0 (+https://www.yourwebsite.com/)'.

```

---

### Ignore Single Metric in Simple Analytics Script

Source: https://docs.simpleanalytics.com/ignore-metrics

Demonstrates how to configure the Simple Analytics script to prevent the collection of a specific metric, such as session IDs, by adding the `data-ignore-metrics` attribute with the metric's slug.

```HTML
<script
  data-ignore-metrics="session"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Manually Fire Events with Simple Analytics JavaScript API

Source: https://docs.simpleanalytics.com/events/inline

You can programmatically trigger events using the `sa_event("event_name", { key: value })` JavaScript function. This method works independently of the auto-binding features and does not require the additional script typically used for automatic tracking.

```JavaScript
sa_event("newsletter_signup", { source: "modal" })
```

---

### JavaScript: Overwriting pushState for Automatic SPA Page View Tracking

Source: https://docs.simpleanalytics.com/trigger-custom-page-views

This JavaScript snippet illustrates how Simple Analytics automatically tracks page views in Single Page Applications (SPAs). It achieves this by overwriting the browser's native `history.pushState` function to dispatch a custom event (`pushState`) whenever the history state changes. This mechanism allows the analytics script to detect navigation events without requiring explicit page view calls from the application code.

```JavaScript
// We check if the browser supports pushState
if (history.pushState && Event && dispatchEvent) {
  // We create a listener based on the original browser feature
  var stateListener = function (type) {
    var orig = history[type];
    return function () {
      var rv = orig.apply(this, arguments);
      var event = new Event(type);
      event.arguments = arguments;
      dispatchEvent(event);
      return rv;
    };
  };

  // We connect our own created a listener to the pushState feature
  history.pushState = stateListener("pushState");

  // Now we can listen for pushState events and keep the original feature of the browser working
  window.addEventListener("pushState", function () {
    // Here we trigger the page view
  });
}
```

---

### Embed Simple Analytics Script to Ignore Specific Metrics

Source: https://docs.simpleanalytics.com/ignore-metrics

This HTML script tag embeds the Simple Analytics tracking script. The `data-ignore-metrics` attribute is used to specify a comma-separated list of metrics that should not be collected, enhancing user privacy. This includes common tracking data like referrer, UTM parameters, user location, session details, and device information.

```HTML
<script
  data-ignore-metrics="referrer,utm,country,session,timeonpage,scrolled,useragent,screensize,viewportsize,language"
  src="https://scripts.simpleanalyticscdn.com/latest.js"
></script>
```

---

### Track Form Submissions with HTML Data Attributes

Source: https://docs.simpleanalytics.com/events/inline

To track form submissions, place the `data-simple-event="form_name"` attribute directly on your HTML form tag. Upon submission, the script will send an event named after the form, including the text of the submit button, before allowing the form to submit normally.

```HTML
<form action="/signup" data-simple-event="signup_form">
  <input name="email" type="email" />
  <input name="password" type="password" />
  <button type="submit">Sign up</button>
</form>
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
