import { generateReactHelpers } from "@uploadthing/react";
import { ourFileRouter } from "./app/api/uploadthing/core";

const helpers = generateReactHelpers<typeof ourFileRouter>();
console.log(Object.keys(helpers));
