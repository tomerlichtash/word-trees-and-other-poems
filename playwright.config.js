// SITE_DIR: folder to serve (docs = Jekyll output, . = plain site). MODE=hash for the plain-html router.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 20000,
  use: { baseURL: 'http://localhost:8123' },
  webServer: {
    command: `python3 -m http.server 8123 -d ${process.env.SITE_DIR || '.'}`,
    url: 'http://localhost:8123/',
    reuseExistingServer: false,
  },
});
