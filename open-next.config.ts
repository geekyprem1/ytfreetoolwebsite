import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

/**
 * Cloudflare OpenNext configuration.
 *
 * ISR pages use R2 for the incremental cache and a Durable Object queue for
 * time-based revalidation. The app does not call revalidateTag/revalidatePath,
 * so a D1 tag cache is not required.
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
  }),
  queue: doQueue,
  enableCacheInterception: true,
});
