import { relations } from "drizzle-orm";
import { boats, fishers, preparations, transactions, trips } from "./schema";

export const boatsRelations = relations(boats, ({ many }) => ({
  trips: many(trips),
  preparations: many(preparations),
  transactions: many(transactions),
}));

export const fishersRelations = relations(fishers, ({ many }) => ({
  transactions: many(transactions),
}));

export const tripsRelations = relations(trips, ({ one, many }) => ({
  boat: one(boats, { fields: [trips.boatId], references: [boats.id] }),
  preparations: many(preparations),
  transactions: many(transactions),
}));

export const preparationsRelations = relations(preparations, ({ one }) => ({
  boat: one(boats, { fields: [preparations.boatId], references: [boats.id] }),
  trip: one(trips, { fields: [preparations.tripId], references: [trips.id] }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  boat: one(boats, { fields: [transactions.boatId], references: [boats.id] }),
  trip: one(trips, { fields: [transactions.tripId], references: [trips.id] }),
  fisher: one(fishers, { fields: [transactions.fisherId], references: [fishers.id] }),
}));
