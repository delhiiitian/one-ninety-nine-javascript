// 9.5 Configuration with environment variables
// Run: node chapter-09-real-world/05-environment-config.js
// Try: PORT=8080 APP_ENV=production node chapter-09-real-world/05-environment-config.js
// Or with a file: node --env-file=chapter-09-real-world/example.env chapter-09-real-world/05-environment-config.js

// Settings that change between laptop, test and production (ports, URLs, secrets)
// should NOT be written into code. They come from the environment, like the
// thermostat settings of a hotel room: same room design, different setting per guest.

function loadConfig(env = process.env) {
  const config = {
    env: env.APP_ENV ?? "development",
    port: Number(env.PORT ?? 3000),
    databaseUrl: env.DATABASE_URL ?? "sqlite://local.db",
    apiKey: env.WEATHER_API_KEY, // secret: no default on purpose
    debug: env.DEBUG === "true",
  };

  // Fail fast at startup if something essential is wrong.
  if (!Number.isInteger(config.port) || config.port <= 0) {
    throw new Error(`PORT must be a positive whole number, got "${env.PORT}"`);
  }
  if (config.env === "production" && !config.apiKey) {
    throw new Error("WEATHER_API_KEY is required in production");
  }
  return Object.freeze(config);
}

const config = loadConfig();
// Never print secrets in full. Mask them.
const masked = { ...config, apiKey: config.apiKey ? config.apiKey.slice(0, 3) + "***" : "(not set)" };
console.log("Loaded config:", masked);

// Testing the validation with fake environments:
for (const fakeEnv of [{ PORT: "abc" }, { APP_ENV: "production" }]) {
  try {
    loadConfig(fakeEnv);
  } catch (error) {
    console.log("Config error:", error.message);
  }
}

// Keep secrets in a .env file that is listed in .gitignore, never committed.
