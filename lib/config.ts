// Environment variables configuration
export const config = {
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-key-change-in-production",
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Validate required environment variables
export function validateEnv() {
  if (!config.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  if (config.NODE_ENV === "production" && config.JWT_SECRET === "dev-secret-key-change-in-production") {
    throw new Error("JWT_SECRET must be set in production");
  }
}
