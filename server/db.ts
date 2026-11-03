import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  boats,
  fishers,
  InsertBoat,
  InsertFisher,
  InsertPreparation,
  InsertTransaction,
  InsertTrip,
  preparations,
  transactions,
  trips,
  InsertUser,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch {
      console.warn("[Database] Failed to connect");
      _db = null;
    }
  }
  return _db;
}

function requireDb(db: Awaited<ReturnType<typeof getDb>>) {
  if (!db) throw new Error("قاعدة البيانات غير متاحة حالياً");
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listBoats() { return (await getDb()) ? (await getDb())!.select().from(boats).orderBy(desc(boats.createdAt)) : []; }
export async function createBoat(input: InsertBoat) { const db = requireDb(await getDb()); await db.insert(boats).values(input); return (await listBoats())[0]; }
export async function updateBoat(id: number, input: Partial<InsertBoat>) { const db = requireDb(await getDb()); await db.update(boats).set({ ...input, updatedAt: new Date() }).where(eq(boats.id, id)); return (await db.select().from(boats).where(eq(boats.id, id)).limit(1))[0]; }

export async function listFishers() { return (await getDb()) ? (await getDb())!.select().from(fishers).orderBy(desc(fishers.createdAt)) : []; }
export async function createFisher(input: InsertFisher) { const db = requireDb(await getDb()); await db.insert(fishers).values(input); return (await listFishers())[0]; }
export async function updateFisher(id: number, input: Partial<InsertFisher>) { const db = requireDb(await getDb()); await db.update(fishers).set({ ...input, updatedAt: new Date() }).where(eq(fishers.id, id)); return (await db.select().from(fishers).where(eq(fishers.id, id)).limit(1))[0]; }

export async function listTrips() { const db = await getDb(); return db ? db.select().from(trips).orderBy(desc(trips.createdAt)) : []; }
export async function createTrip(input: InsertTrip) { const db = requireDb(await getDb()); await db.insert(trips).values(input); return (await listTrips())[0]; }

export async function listPreparations() { const db = await getDb(); return db ? db.select().from(preparations).orderBy(desc(preparations.createdAt)) : []; }
export async function createPreparation(input: InsertPreparation) { const db = requireDb(await getDb()); await db.insert(preparations).values(input); return (await listPreparations())[0]; }

export async function listTransactions() { const db = await getDb(); return db ? db.select().from(transactions).orderBy(desc(transactions.transactionDate)) : []; }
export async function createTransaction(input: InsertTransaction) { const db = requireDb(await getDb()); await db.insert(transactions).values(input); return (await listTransactions())[0]; }
