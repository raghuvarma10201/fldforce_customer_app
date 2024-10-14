import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.padcustomer.starter',
  appName: 'PSD-Customer app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
