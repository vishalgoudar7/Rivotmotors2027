export const dbConfig = {
  url: process.env.DATABASE_URL || "",
  provider: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME || "rivot_booking",
  user: process.env.DB_USER || "root",
};

export function requireDatabaseUrl() {
  if (!dbConfig.url) {
    throw new Error("DATABASE_URL is not configured. Add it to your .env file.");
  }

  return dbConfig.url;
}
