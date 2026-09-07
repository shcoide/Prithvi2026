
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core"; // Or wherever your core.ts is

// Vercel sets VERCEL_URL per-deployment (preview and production); NEXT_PUBLIC_BASE_URL
// overrides it for a stable custom domain when set.
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://prithvi2026.com");

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    // This forces Uploadthing to explicitly ping your live domain!
    callbackUrl: `${baseUrl}/api/uploadthing`,
  },
});