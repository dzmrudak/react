import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Rest of your config...
  outputDir: 'test-results/',
  reporter: process.env.CI ? 'dot' : 'list',

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