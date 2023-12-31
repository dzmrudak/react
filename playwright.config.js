import { defineConfig } from '@playwright/test';
import { devices } from "@playwright/test";

export default defineConfig({
  // Rest of your config...

  reporter: 'list',

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8080',
  }
});