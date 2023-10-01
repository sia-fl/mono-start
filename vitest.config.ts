import { defineConfig } from 'vitest/config';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    setupFiles: ['./setup-crypto.ts']
  }
});
