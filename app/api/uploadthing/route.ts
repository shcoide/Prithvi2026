
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core"; // Or wherever your core.ts is

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    // This forces Uploadthing to explicitly ping your live domain!
    callbackUrl: "https://prithvi2026.com/api/uploadthing",
  },
});