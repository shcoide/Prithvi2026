require('dotenv').config({ path: '.env.local' });
const { generateReactHelpers } = require("@uploadthing/react");
const helpers = generateReactHelpers();
console.log(Object.keys(helpers));
