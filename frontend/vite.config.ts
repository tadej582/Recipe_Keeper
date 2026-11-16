/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    include: ["src/**/*.test.{ts,tsx}"], // component tests only; Playwright's e2e/ has its own runner.
  },
});
