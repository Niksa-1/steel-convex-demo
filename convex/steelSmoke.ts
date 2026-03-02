import { action } from "./_generated/server";
import { components } from "./_generated/api";
import { SteelComponent } from "steel-convex-component";
import { v } from "convex/values";

const steel = new SteelComponent(components.steel, {
  STEEL_API_KEY: process.env.STEEL_API_KEY,
});

export const run = action({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    const created = await steel.sessions.create(
      ctx,
      { sessionArgs: { timeout: 120000 } },
      { ownerId: args.ownerId },
    );

    const refreshed = await steel.sessions.refresh(
      ctx,
      { externalId: created.externalId },
      { ownerId: args.ownerId },
    );

    const released = await steel.sessions.release(
      ctx,
      { externalId: created.externalId },
      { ownerId: args.ownerId },
    );

    return { created, refreshed, released };
  },
});
