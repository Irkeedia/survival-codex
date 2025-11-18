import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.VITE_APP_ID || 'com.irkeedia.survivalcodex',
  appName: process.env.VITE_APP_NAME || 'Survival Codex',
  webDir: 'dist',
  bundledWebRuntime: false,
  backgroundColor: '#0D0A1A',
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
