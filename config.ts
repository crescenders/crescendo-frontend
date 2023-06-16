export const CONFIG = {
  LOCAL: process.env.NEXT_PUBLIC_LOCAL,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  API_KEY: {
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
  },
} as const;
