import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'MediMinderApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
