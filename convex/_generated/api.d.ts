/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as steelSmoke from "../steelSmoke.js";
import type * as steelTitleDemo from "../steelTitleDemo.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  steelSmoke: typeof steelSmoke;
  steelTitleDemo: typeof steelTitleDemo;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  steel: {
    captchas: {
      solve: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs?: Record<string, any>;
          ownerId?: string;
          pageId?: string;
          sessionExternalId: string;
          taskId?: string;
          url?: string;
        },
        any
      >;
      solveImage: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs?: Record<string, any>;
          imageXPath: string;
          inputXPath: string;
          ownerId?: string;
          sessionExternalId: string;
          url?: string;
        },
        any
      >;
      status: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          ownerId?: string;
          pageId?: string;
          persistSnapshot?: boolean;
          sessionExternalId: string;
        },
        any
      >;
    };
    credentials: {
      create: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          credentialArgs?: Record<string, any>;
          ownerId?: string;
        },
        any
      >;
      delete: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId?: string;
          namespace?: string;
          origin?: string;
          ownerId?: string;
        },
        any
      >;
      list: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          cursor?: string;
          limit?: number;
          ownerId?: string;
          queryArgs?: Record<string, any>;
        },
        any
      >;
      update: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          credentialArgs?: Record<string, any>;
          ownerId?: string;
        },
        any
      >;
    };
    extensions: {
      delete: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId?: string },
        any
      >;
      deleteAll: FunctionReference<
        "action",
        "internal",
        { apiKey: string; ownerId?: string },
        any
      >;
      download: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId?: string },
        any
      >;
      list: FunctionReference<
        "action",
        "internal",
        { apiKey: string; cursor?: string; limit?: number; ownerId?: string },
        any
      >;
      update: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          extensionArgs?: Record<string, any>;
          externalId: string;
          file?: string;
          ownerId?: string;
          url?: string;
        },
        any
      >;
      updateFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          extensionArgs?: Record<string, any>;
          externalId: string;
          file?: string;
          ownerId?: string;
          url?: string;
        },
        any
      >;
      upload: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          extensionArgs?: Record<string, any>;
          file?: string;
          ownerId?: string;
          url?: string;
        },
        any
      >;
      uploadFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          extensionArgs?: Record<string, any>;
          file?: string;
          ownerId?: string;
          url?: string;
        },
        any
      >;
    };
    files: {
      delete: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId?: string;
          ownerId?: string;
          path?: string;
        },
        any
      >;
      download: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId?: string;
          ownerId?: string;
          path?: string;
        },
        any
      >;
      downloadToStorage: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId?: string;
          ownerId?: string;
          path?: string;
        },
        any
      >;
      list: FunctionReference<
        "action",
        "internal",
        { apiKey: string; cursor?: string; limit?: number; ownerId?: string },
        any
      >;
      upload: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          file?: string;
          fileArgs?: Record<string, any>;
          ownerId?: string;
          path?: string;
          url?: string;
        },
        any
      >;
      uploadFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          file?: string;
          fileArgs?: Record<string, any>;
          ownerId?: string;
          path?: string;
          url?: string;
        },
        any
      >;
    };
    profiles: {
      create: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          ownerId?: string;
          profileArgs?: Record<string, any>;
          userDataDirUrl?: string;
        },
        any
      >;
      createFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          ownerId?: string;
          profileArgs?: Record<string, any>;
          userDataDirUrl?: string;
        },
        any
      >;
      get: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId?: string },
        any
      >;
      list: FunctionReference<
        "action",
        "internal",
        { apiKey: string; cursor?: string; limit?: number; ownerId?: string },
        any
      >;
      update: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId: string;
          ownerId?: string;
          profileArgs?: Record<string, any>;
          userDataDirUrl?: string;
        },
        any
      >;
      updateFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId: string;
          ownerId?: string;
          profileArgs?: Record<string, any>;
          userDataDirUrl?: string;
        },
        any
      >;
    };
    sessionFiles: {
      delete: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          ownerId?: string;
          path: string;
          sessionExternalId: string;
        },
        any
      >;
      deleteAll: FunctionReference<
        "action",
        "internal",
        { apiKey: string; ownerId?: string; sessionExternalId: string },
        any
      >;
      list: FunctionReference<
        "action",
        "internal",
        { apiKey: string; ownerId?: string; sessionExternalId: string },
        any
      >;
      upload: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          file?: string;
          fileArgs?: Record<string, any>;
          ownerId?: string;
          path?: string;
          sessionExternalId: string;
          url?: string;
        },
        any
      >;
      uploadFromUrl: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          file?: string;
          fileArgs?: Record<string, any>;
          ownerId?: string;
          path?: string;
          sessionExternalId: string;
          url?: string;
        },
        any
      >;
    };
    sessions: {
      computer: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs: Record<string, any>;
          externalId: string;
          ownerId: string;
        },
        any
      >;
      context: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId: string },
        any
      >;
      create: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          includeRaw?: boolean;
          ownerId: string;
          sessionArgs?: Record<string, any>;
        },
        any
      >;
      events: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId: string },
        any
      >;
      get: FunctionReference<
        "query",
        "internal",
        { id: string; ownerId: string },
        any
      >;
      getByExternalId: FunctionReference<
        "query",
        "internal",
        { externalId: string; ownerId: string },
        any
      >;
      list: FunctionReference<
        "query",
        "internal",
        {
          cursor?: string;
          limit?: number;
          ownerId: string;
          status?: "live" | "released" | "failed";
        },
        any
      >;
      liveDetails: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId: string },
        any
      >;
      refresh: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          externalId: string;
          includeRaw?: boolean;
          ownerId: string;
        },
        any
      >;
      refreshMany: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          cursor?: string;
          includeRaw?: boolean;
          limit?: number;
          ownerId: string;
          status?: "live" | "released" | "failed";
        },
        any
      >;
      release: FunctionReference<
        "action",
        "internal",
        { apiKey: string; externalId: string; ownerId: string },
        any
      >;
      releaseAll: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          cursor?: string;
          limit?: number;
          ownerId: string;
          status?: "live" | "released" | "failed";
        },
        any
      >;
    };
    topLevel: {
      pdf: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs?: Record<string, any>;
          delay?: number;
          ownerId?: string;
          timeout?: number;
          url: string;
        },
        any
      >;
      scrape: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs?: Record<string, any>;
          delay?: number;
          ownerId?: string;
          timeout?: number;
          url: string;
        },
        any
      >;
      screenshot: FunctionReference<
        "action",
        "internal",
        {
          apiKey: string;
          commandArgs?: Record<string, any>;
          delay?: number;
          ownerId?: string;
          timeout?: number;
          url: string;
        },
        any
      >;
    };
  };
};
