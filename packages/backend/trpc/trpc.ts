import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

const checkAuthIfRequired = middleware(async ({ ctx, next }) => {
  if (process.env.AUTH_REQUIRED === "true" && ctx.user.isGuest) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Login is required" });
  }
  return next();
});

export const possiblyPublicProcedure = t.procedure.use(checkAuthIfRequired);

export const mergeRouters = t.mergeRouters;
