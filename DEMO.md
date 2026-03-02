Yes. Fastest live test flow:

1. Install this package in your Convex app.
- Since npm publish is blocked right now, use GitHub tag:
```bash
npm i github:steel-experiments/steel-convex-component#v0.2.0
```

2. Wire the component in your Convex app config (same pattern as [convex.config.ts](/home/agent/steel-convex-component/example/convex/convex.config.ts)).
```ts
import { defineApp } from "convex/server";
import steel from "steel-convex-component/convex.config";

const app = defineApp();
app.use(steel);
export default app;
```

3. Add a smoke action (same pattern as [steelExample.ts](/home/agent/steel-convex-component/example/convex/steelExample.ts)).
```ts
// convex/steelSmoke.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
import { components } from "./_generated/server";
import { SteelComponent } from "steel-convex-component";

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
```

4. Set env + run.
```bash
npx convex dev
npx convex env set STEEL_API_KEY <your_steel_key>
npx convex run steelSmoke:run '{"ownerId":"tenant-live-1"}'
```

5. Verify cache data.
```bash
npx convex run steelSmoke:run '{"ownerId":"tenant-live-1"}'
# or call your own query using steel.sessions.list/getByExternalId
```

If you want, I can give you a second smoke action that exercises `sessionFiles`, `captchas`, `profiles`, `credentials`, `extensions`, `files`, and `topLevel` too.
