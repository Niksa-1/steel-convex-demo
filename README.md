# steel-convex-demo

Minimal working demo for integrating
[`steel-convex-component`](https://github.com/steel-experiments/steel-convex-component)
into a Convex app and verifying the session lifecycle end-to-end.

## What this demo proves

This demo proves the Steel Convex component is wired correctly by:

1. Registering the component in `convex/convex.config.ts`.
2. Running a real action (`steelSmoke:run`) that calls:
   - `sessions.create`
   - `sessions.refresh`
   - `sessions.release`
3. Returning real Steel responses including `externalId`, URLs, and status transitions.
4. Running with tenant scoping (`ownerId`) to confirm multi-tenant call context works.

If the action returns `created.status = "live"` and `released.status = "released"`,
the integration is working.

## Project layout

- `convex/convex.config.ts`: Mounts the Steel Convex component.
- `convex/steelSmoke.ts`: Smoke action that executes create -> refresh -> release.
- `convex/schema.ts`: Minimal root Convex schema required for deployment.
- `scripts/ensure-steel-component-built.mjs`: Postinstall compatibility step for GitHub tag installs.

## Prerequisites

- Node.js 18+
- npm
- A valid `STEEL_API_KEY`

## Setup

Install dependencies:

```bash
npm install
```

Notes:

- The component is installed from GitHub tag:
  `github:steel-experiments/steel-convex-component#v0.2.0`
- `postinstall` runs `scripts/ensure-steel-component-built.mjs` to:
  1. build `steel-convex-component` if `dist/` is missing
  2. patch a default schema export when needed for local Convex compatibility

## Run locally

Start Convex dev:

```bash
npx convex dev
```

In another terminal, set the Steel key in Convex runtime env:

```bash
npx convex env set STEEL_API_KEY <your_steel_key>
```

Run the smoke action:

```bash
npx convex run steelSmoke:run '{"ownerId":"tenant-live-1"}'
```

Run it again to verify repeated tenant-scoped calls:

```bash
npx convex run steelSmoke:run '{"ownerId":"tenant-live-1"}'
```

## Expected output

The action returns:

- `created`
- `refreshed`
- `released`

Each object contains Steel session data like:

- `externalId`
- `status`
- `ownerId`
- `debugUrl`
- `sessionViewerUrl`
- `websocketUrl`

Expected status flow:

1. `created.status` is `live`
2. `refreshed.status` is usually `live`
3. `released.status` is `released`

## Website title demo

This repo also includes `steelTitleDemo:getTitle`, which uses the Steel
component scrape action to fetch page metadata and return `metadata.title`.

The action tries compatible component routes in order:

1. `components.steel.scrape`
2. `components.steel.topLevel.scrape`
3. `components.steel.steel.scrape`

Default target URL:

- `https://example.com`

Run:

```bash
npx convex run steelTitleDemo:getTitle '{"ownerId":"tenant-live-1"}'
```

Override URL:

```bash
npx convex run steelTitleDemo:getTitle '{"ownerId":"tenant-live-1","url":"https://example.com"}'
```

Expected result includes:

- `title: "Example Domain"`
- `url: "https://example.com/"`

## Common issues

`Missing STEEL_API_KEY`:

- Cause: Convex runtime env does not inherit your shell env.
- Fix: run `npx convex env set STEEL_API_KEY <your_steel_key>`.

`No matching export ... components`:

- Cause: importing `components` from `./_generated/server`.
- Fix: import from `./_generated/api` (already done in this repo).

`Schema file missing default export` during local push:

- Cause: compatibility mismatch from GitHub-tag component artifact.
- Fix: keep the postinstall script enabled (already configured).
