import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const boats = mysqlTable("boats", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  code: varchar("code", { length: 40 }).notNull(),
  captain: varchar("captain", { length: 120 }),
  status: mysqlEnum("status", ["ready", "at_sea", "maintenance"]).default("ready").notNull(),
  crewCount: int("crewCount").default(0).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const fishers = mysqlTable("fishers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  role: varchar("role", { length: 80 }).default("صياد").notNull(),
  phone: varchar("phone", { length: 30 }),
  address: varchar("address", { length: 220 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const trips = mysqlTable("trips", {
  id: int("id").autoincrement().primaryKey(),
  boatId: int("boatId").notNull().references(() => boats.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 160 }).notNull(),
  status: mysqlEnum("status", ["planned", "active", "completed"]).default("planned").notNull(),
  departureAt: timestamp("departureAt"),
  returnAt: timestamp("returnAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const preparations = mysqlTable("preparations", {
  id: int("id").autoincrement().primaryKey(),
  boatId: int("boatId").notNull().references(() => boats.id, { onDelete: "cascade" }),
  tripId: int("tripId").references(() => trips.id, { onDelete: "set null" }),
  category: mysqlEnum("category", ["food", "fuel", "equipment"]).notNull(),
  itemName: varchar("itemName", { length: 160 }).notNull(),
  quantity: decimal("quantity", { precision: 12, scale: 2 }).default("1").notNull(),
  unit: varchar("unit", { length: 30 }).default("وحدة").notNull(),
  cost: decimal("cost", { precision: 12, scale: 2 }).default("0").notNull(),
  isReady: int("isReady").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  boatId: int("boatId").references(() => boats.id, { onDelete: "set null" }),
  tripId: int("tripId").references(() => trips.id, { onDelete: "set null" }),
  fisherId: int("fisherId").references(() => fishers.id, { onDelete: "set null" }),
  type: mysqlEnum("type", ["income", "expense"]).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  description: varchar("description", { length: 220 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  transactionDate: timestamp("transactionDate").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Boat = typeof boats.$inferSelect;
export type InsertBoat = typeof boats.$inferInsert;
export type Fisher = typeof fishers.$inferSelect;
export type InsertFisher = typeof fishers.$inferInsert;
export type Trip = typeof trips.$inferSelect;
export type InsertTrip = typeof trips.$inferInsert;
export type Preparation = typeof preparations.$inferSelect;
export type InsertPreparation = typeof preparations.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
