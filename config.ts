export const CONFIG = {
  LOCAL: process.env.NEXT_PUBLIC_LOCAL,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  ENV: process.env.NODE_ENV,
  API_KEY: {
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
  },
} as const;
