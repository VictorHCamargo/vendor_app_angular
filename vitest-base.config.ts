// Learn more about Vitest configuration options at https://vitest.dev/config/
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./src/test-setup.ts'],
  },
});
