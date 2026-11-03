import { z } from "zod";
import { getSessionCookieName, getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  createBoat,
  createFisher,
  createPreparation,
  createTransaction,
  createTrip,
  listBoats,
  listFishers,
  listPreparations,
  listTransactions,
  listTrips,
  updateBoat,
  updateFisher,
} from "./db";

const optionalText = z.string().trim().max(220).optional().nullable();

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(getSessionCookieName(ctx.req), { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  boats: router({
    list: publicProcedure.query(() => listBoats()),
    create: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(120), code: z.string().trim().min(1).max(40), captain: optionalText, status: z.enum(["ready", "at_sea", "maintenance"]).default("ready"), crewCount: z.number().int().min(0).max(100).default(0), notes: optionalText })).mutation(({ input }) => createBoat(input)),
    update: publicProcedure.input(z.object({ id: z.number().int().positive(), name: z.string().trim().min(2).max(120).optional(), code: z.string().trim().min(1).max(40).optional(), captain: optionalText, status: z.enum(["ready", "at_sea", "maintenance"]).optional(), crewCount: z.number().int().min(0).max(100).optional(), notes: optionalText })).mutation(({ input }) => { const { id, ...changes } = input; return updateBoat(id, changes); }),
  }),
  fishers: router({
    list: publicProcedure.query(() => listFishers()),
    create: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(120), role: z.string().trim().min(2).max(80).default("صياد"), phone: optionalText, address: optionalText, notes: optionalText })).mutation(({ input }) => createFisher(input)),
    update: publicProcedure.input(z.object({ id: z.number().int().positive(), name: z.string().trim().min(2).max(120).optional(), role: z.string().trim().min(2).max(80).optional(), phone: optionalText, address: optionalText, notes: optionalText })).mutation(({ input }) => { const { id, ...changes } = input; return updateFisher(id, changes); }),
  }),
  trips: router({
    list: publicProcedure.query(() => listTrips()),
    create: publicProcedure.input(z.object({ boatId: z.number().int().positive(), title: z.string().trim().min(2).max(160), status: z.enum(["planned", "active", "completed"]).default("planned"), departureAt: z.coerce.date().optional().nullable(), returnAt: z.coerce.date().optional().nullable(), notes: optionalText })).mutation(({ input }) => createTrip(input)),
  }),
  preparations: router({
    list: publicProcedure.query(() => listPreparations()),
    create: publicProcedure.input(z.object({ boatId: z.number().int().positive(), tripId: z.number().int().positive().optional().nullable(), category: z.enum(["food", "fuel", "equipment"]), itemName: z.string().trim().min(2).max(160), quantity: z.string().default("1"), unit: z.string().trim().min(1).max(30).default("وحدة"), cost: z.string().default("0"), isReady: z.number().int().min(0).max(1).default(0) })).mutation(({ input }) => createPreparation(input)),
  }),
  transactions: router({
    list: publicProcedure.query(() => listTransactions()),
    create: publicProcedure.input(z.object({ boatId: z.number().int().positive().optional().nullable(), tripId: z.number().int().positive().optional().nullable(), fisherId: z.number().int().positive().optional().nullable(), type: z.enum(["income", "expense"]), category: z.string().trim().min(2).max(80), description: z.string().trim().min(2).max(220), amount: z.string().min(1), transactionDate: z.coerce.date().optional() })).mutation(({ input }) => createTransaction(input)),
  }),
});

export type AppRouter = typeof appRouter;
