import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  dbUnavailableUntil?: number;
};

const COOLDOWN_MS = 60_000; // 1 minute cooldown on failure

function withConnectionTimeouts(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("connect_timeout", parsed.searchParams.get("connect_timeout") ?? "2");
    parsed.searchParams.set("pool_timeout", parsed.searchParams.get("pool_timeout") ?? "2");
    return parsed.toString();
  } catch {
    return url;
  }
}

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    if (process.env.DATABASE_URL) {
      process.env.DATABASE_URL = withConnectionTimeouts(process.env.DATABASE_URL);
    }

    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return globalForPrisma.prisma;
}

export function markDatabaseUnavailable() {
  globalForPrisma.dbUnavailableUntil = Date.now() + COOLDOWN_MS;
}

export function canUseDatabase() {
  if (!process.env.DATABASE_URL) return false;
  if (globalForPrisma.dbUnavailableUntil && Date.now() < globalForPrisma.dbUnavailableUntil) {
    return false;
  }
  return true;
}

export async function runSafeQuery<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!canUseDatabase()) return fallback;
  try {
    return await operation();
  } catch (err) {
    console.warn("Database connection failed, falling back to mock data:", err);
    markDatabaseUnavailable();
    return fallback;
  }
}
